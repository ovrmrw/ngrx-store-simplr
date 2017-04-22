import { Inject, SkipSelf, Optional, Injectable, Injector, forwardRef } from '@angular/core'
import { Store, Action, Dispatcher, State } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
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
import { AsyncResolver } from './resolver'
import { SimplrOptions, Result } from './common'
import { Adapter } from './adapters'

const TIMEOUT = 1000 * 15
const RETRY = 3


@Injectable()
export class Simplr<T>  {
  private wrapper = new Wrapper<T>()

  constructor(
    @Inject(Adapter) private adapter: Adapter<T>,
  ) { }

  dispatch<K extends keyof T>(key: K, resolver: AsyncResolver<T, K>, options: SimplrOptions = {}): Observable<Result<T, K>> {
    // const returner$ = new Subject<Action>()
    const returner$ = new ReplaySubject<Action>()
    const { _UPDATE_, _FAILED_ } = this.wrapper.createActionKeys(key)

    const action$: Observable<Action> =
      Observable.of(resolver)
        .concatMap(projection => {
          if (projection instanceof Promise || projection instanceof Observable) {
            return Observable.from(projection).retry(options.retry || RETRY)
          } else {
            return Observable.of(projection)
          }
        })
        .combineLatest(this.adapter.getState())
        .timeout(options.timeout || TIMEOUT)
        .take(1)
        // .delay(0) // workaround for fakeAsync testing
        .map(([callback, state]) => {
          if (callback instanceof Function) {
            return callback(state[key], state)
          } else {
            throw new Error(callback + ' is not a Funtion.')
          }
        })
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
      if (this.adapter.testing) {
        console.log('TEST: ' + action.type + ' is dispatched.')
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
