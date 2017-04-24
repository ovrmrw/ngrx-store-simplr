import { Observable } from 'rxjs/Observable'
import { Action } from '../common'


export abstract class Adapter<T> {
  readonly abstract testing: boolean
  abstract setState<K extends keyof T>(action: Action, key?: K): void;
  abstract getState(): Observable<T>;
  abstract setInitialState(state: T): void;
}
