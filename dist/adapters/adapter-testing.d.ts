import { Observable } from 'rxjs/Observable';
import { Action } from '../common';
import { Adapter } from './adapter';
export declare class AdapterForTesting<T> extends Adapter<T> {
    testing: boolean;
    private fakeState;
    private wrapper;
    setState<K extends keyof T>(action: Action, key: K): void;
    getState(): Observable<T>;
    setInitialState(state: Partial<T>): void;
}
