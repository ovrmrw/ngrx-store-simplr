import { Observable } from 'rxjs/Observable'

import { Action } from '../common'


export abstract class Adapter<T> {
  readonly abstract testing: boolean
  readonly abstract currentState$: Observable<T>
  abstract setState<K extends keyof T>(action: Action, key?: K): Action;
  abstract getState(): Observable<T>;
  abstract setInitialState(state: T): void;
}
