import { Inject, Optional, Injectable } from '@angular/core'
import { Store, Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/from'
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/operator/combineLatest'
import 'rxjs/add/operator/timeout'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/retry'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/delay'

import { Wrapper } from './wrapper'
import { ValueOrResolver, SyncValueOrResolver } from './resolver'
import { SimplrOptions, Result } from './common'
import { Adapter } from './adapters'

const TIMEOUT = 1000 * 15
const RETRY = 3


@Injectable()
export class Simplr<T>  {
  private wrapper = new Wrapper<T>()

  constructor(
    @Inject(Adapter)
    private adapter: Adapter<T>,
  ) { }

  dispatch<K extends keyof T>(key: K, resolver: ValueOrResolver<T, K>, options: SimplrOptions = {}): Observable<Result<T, K>> {
    const returner$ = new ReplaySubject<Action>()
    const { _UPDATE_, _FAILED_ } = this.wrapper.getActionKeysForSimplr(key)

    const action$: Observable<Action> =
      Observable.of(resolver)
        .concatMap(resolver => { // if resolver is Promise or Observable, resolve it here
          if (resolver instanceof Promise || resolver instanceof Observable) {
            return Observable.from<SyncValueOrResolver<T, K>>(resolver).retry(options.retry || RETRY)
          } else {
            return Observable.of(resolver)
          }
        })
        .combineLatest(this.adapter.getState())
        .timeout(options.timeout || TIMEOUT)
        .take(1)
        .map(([resolver, state]) => { // if resolver is Funtion, call it with states
          if (resolver instanceof Function) {
            return resolver(state[key], state)
          } else {
            return resolver
          }
        })
        .map(function (resolver) { // resolve deep nested callbacks
          let temp: typeof resolver | Function = resolver
          while (temp instanceof Function) {
            temp = temp.apply(null, arguments)
          }
          return temp
        })
        .map(payload => { // resolved-payload must be Object structure
          if (payload instanceof Object && !(payload instanceof Array)) {
            return payload as Partial<T[K]>
          } else {
            if (!this.adapter.testing) {
              console.error('error resolver:', resolver)
              console.error('error resolved-payload:', payload)
            }
            throw new Error('resolved-payload must be Object structure.')
          }
        })
        .map(payload => {
          return {
            type: _UPDATE_,
            payload,
          } as Action
        })
        .catch(err => {
          if (!this.adapter.testing) {
            console.error(err.message || err)
          }
          return Observable.of({
            type: _FAILED_,
            // payload: err,
          } as Action)
        })

    action$.subscribe(action => {
      if (this.adapter.testing) {
        this.adapter.setState(action, key)
      } else {
        this.adapter.setState(action)
      }
      returner$.next(action)
    })

    return returner$
      .combineLatest(this.adapter.getState())
      .take(1)
      .map(([action, state]) => {
        return Object.assign({}, {
          action,
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
