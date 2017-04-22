import { Observable } from 'rxjs/Observable'
import { Action } from '../common'


export abstract class Adapter<T> {
  readonly abstract testing: boolean
  abstract setState(action: Action): void;
  abstract getState(): Observable<T>;
  abstract setTestingState(state: Partial<T>): void;
}
