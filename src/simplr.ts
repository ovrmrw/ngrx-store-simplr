import { Inject, SkipSelf, Optional, Injectable, Injector, forwardRef } from '@angular/core'
import { Store, Action, Dispatcher, State } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
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
import { AsyncResolver } from './resolver'
import { SimplrOptions, SIMPLR_OPTIONS, Result } from './common'

const TIMEOUT = 1000 * 15
const RETRY = 3

@Injectable()
export class Simplr<T>  {
  wrapper = new Wrapper<T>()
  options: SimplrOptions

  constructor(
    @Inject(Store) @Optional() private store: Store<T>,
    @Inject(Injector) @Optional() private injector: Injector,
    // private state: State<T>,
    // private dispatcher: Dispatcher,
    // private wrapper: Wrapper<T>,
    // protected options: SimplrOptions,
  ) {
    // this.options = _options || {}
    if (!this.store) {
      throw new Error('Store is undefined!')
    }
    this.options = this.injector.get(SIMPLR_OPTIONS, {})
  }

  dispatch<K extends keyof T>(key: K, resolver: AsyncResolver<T, K>): Observable<Result<T, K>> {
    const returner$ = new Subject<Action>()
    const { _UPDATE_, _FAILED_ } = this.wrapper.createActionKeys(key)

    const action$: Observable<Action> =
      Observable.of(resolver)
        .concatMap(projection => {
          if (projection instanceof Promise || projection instanceof Observable) {
            return Observable.from(projection).retry(this.options.retry || RETRY)
          } else {
            return Observable.of(projection)
          }
        })
        .combineLatest(this.store.select(s => s))
        // .combineLatest(this.state.map(s => s))
        .timeout(this.options.timeout || TIMEOUT)
        .take(1)
        .delay(0) // workaround for fakeAsync testing
        .map(([callback, state]) => callback(state[key], state))
        .map(state => {
          return {
            type: _UPDATE_,
            payload: state,
          } as Action
        })
        .catch(err => {
          console.error(err.message || err)
          return Observable.of({
            type: _FAILED_,
            // payload: err,
          } as Action)
        })

    action$.subscribe(action => {
      if (this.store.dispatch) {
        this.store.dispatch(action)
      } else {
        console.log('TEST: ' + action.type + ' is dispatched.')
      }
      returner$.next(action)
    })

    return returner$
      .combineLatest(this.store.select(s => s))
      // .combineLatest(this.state.map(s => s))
      .take(1)
      .map(([action, state]) => {
        return Object.assign({}, {
          action,
          state,
          partial: state[key]
        }) as Result<T, K>
      })
      .do(result => {
        if (this.options.logging) {
          console.log('result:', result)
        }
      })
  }
}
