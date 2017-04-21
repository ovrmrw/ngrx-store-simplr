import { Inject } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { Wrapper } from './wrapper';
import { AsyncResolver } from './resolver';
import { Options, SimplrOptions } from './common';

const TIMEOUT = 1000 * 15;
const RETRY = 3;


export class Simplr<T> {
  constructor(
    private store: Store<T>,
    private wrapper: Wrapper<T>,
    @Inject(SimplrOptions) private options: Options,
  ) { }

  dispatch<K extends keyof T>(key: K, resolver: AsyncResolver<T, K>): Observable<Result<T, K>> {
    const returner$ = new Subject<Action>();
    const { _UPDATE_, _FAILED_ } = this.wrapper.createActionKeys(key);

    const action$: Observable<Action> =
      Observable.of(resolver)
        .concatMap(projection => {
          if (projection instanceof Promise || projection instanceof Observable) {
            return Observable.from(projection).retry(this.options.retry || RETRY);
          } else {
            return Observable.of(projection);
          }
        })
        .combineLatest(this.store.select(s => s))
        .timeout(this.options.timeout || TIMEOUT)
        .take(1)
        .delay(0) // workaround for fakeAsync testing
        .map(([callback, state]) => callback(state[key], state))
        .map(state => {
          return {
            type: _UPDATE_,
            payload: state,
          } as Action;
        })
        .catch(err => {
          console.error(err.message || err);
          return Observable.of({
            type: _FAILED_,
            // payload: err,
          } as Action);
        });

    action$.subscribe(action => {
      if (this.store.dispatch) {
        this.store.dispatch(action);
      } else {
        console.log('TEST: ' + action.type + ' is dispatched.');
      }
      returner$.next(action);
    });

    return returner$
      .combineLatest(this.store.select(s => s))
      .take(1)
      .map(([action, state]) => {
        return Object.assign({}, {
          action,
          state,
          partial: state[key]
        }) as Result<T, K>;
      })
      .do(result => {
        if (this.options.logging && this.store.select) {
          console.log('result:', result);
        }
      });
  }
}


export interface Result<T, K extends keyof T> {
  action: Action;
  state: T;
  partial: T[K];
}
