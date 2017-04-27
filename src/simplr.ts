import { Observable } from 'rxjs/Observable'
import { AsyncSubject } from 'rxjs/AsyncSubject'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/combineLatest'
import 'rxjs/add/operator/timeout'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/retry'
import 'rxjs/add/operator/do'
// import 'rxjs/add/operator/toPromise'
// import 'rxjs/add/operator/delay'

import { SimplrOptions, Result, Action, GlobalOptions } from './common'
import { Wrapper } from './wrapper'
import { PartialValueOrResolver, PartialSyncValueOrResolver } from './resolver'
import { Adapter } from './adapters'

const TIMEOUT = 1000 * 15
const RETRY = 3


export class Simplr<T>  {
  private wrapper = new Wrapper<T>()

  constructor(
    private adapter: Adapter<T>,
    private globalOptions: GlobalOptions = {},
  ) { }

  dispatch<K extends keyof T>(key: K, resolver: PartialValueOrResolver<T, K>, options: SimplrOptions = {}): Observable<Result<T, K>> {
    const returner$ = new AsyncSubject<Action>()
    const { _UPDATE_, _FAILED_, _START_, _FINISHED_ } = this.wrapper.getActionKeysForSimplr(key)
    const actions: Action[] = []

    const action$: Observable<Action> =
      Observable.of(resolver)
        .mergeMap(resolver => { // if resolver is Promise or Observable, resolve it here
          if (resolver instanceof Promise || resolver instanceof Observable) {
            if (this.globalOptions.enableAsyncActions) {
              const startAction = this.adapter.setState({ type: _START_ }, key)
              actions.push(startAction)
            }
            return Observable.from<PartialSyncValueOrResolver<T, K>>(resolver).retry(options.retry || RETRY)
          } else {
            return Observable.of(resolver)
          }
        })
        .combineLatest(this.adapter.currentState$) // combine synced resolver and current State
        .timeout(options.timeout || TIMEOUT)
        .take(1)
        .map(([resolver, state]) => { // if resolver is Funtion, call it with states
          if (resolver instanceof Function) {
            return resolver(state[key], state)
          } else {
            return resolver
          }
        })
        .map(resolver => { // resolve deep nested callbacks
          let temp: typeof resolver | Function = resolver
          while (temp instanceof Function) {
            temp = temp()
          }
          return temp
        })
        .mergeMap(payload => { // return Update Action
          return Observable
            .of<Action>({
              type: _UPDATE_,
              payload,
            })
            .map(action => {
              if (options.desc) {
                return { ...action, desc: options.desc }
              } else {
                return action
              }
            })
          // .map(action => {
          //   if (this.globalOptions.enableAsyncFlag && (resolver instanceof Promise || resolver instanceof Observable)) {
          //     return { ...action, async: true }
          //   } else {
          //     return action
          //   }
          // })
        })
        .catch(err => { // return Failed Action
          if (!this.adapter.testing) {
            console.error(err.message || err)
          }
          return Observable.of({
            type: _FAILED_,
            // payload: err,
          } as Action)
        })

    action$
      .subscribe(action => { // dispatch Action to Store
        // if (this.adapter.testing) {
        //   this.adapter.setState(action, key)
        // } else {
        //   this.adapter.setState(action)
        // }
        const mainAction = this.adapter.setState(action, key)
        actions.push(mainAction)

        if (this.globalOptions.enableAsyncActions && (resolver instanceof Promise || resolver instanceof Observable)) {
          const finishedAction = this.adapter.setState({ type: _FINISHED_ }, key)
          actions.push(finishedAction)
        }

        returner$.next(action)
        returner$.complete()
      })

    return returner$
      .combineLatest(this.adapter.currentState$) // combine dispatched Action and updated State
      .take(1)
      .map(([action, state]) => { // return Result object
        return Object.assign({}, {
          action,
          actions,
          state,
          partial: state[key]
        }) as Result<T, K>
      })
      .do(result => {
        if (options.logging) {
          console.log('result:', result)
        }
      })
  }
}
