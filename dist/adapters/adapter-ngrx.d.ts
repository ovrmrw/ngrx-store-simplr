import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Action } from '../common';
import { Adapter } from './adapter';
export declare class AdapterForNgrxStore<T> extends Adapter<T> {
    private store;
    testing: boolean;
    constructor(store: Store<T>);
    setState(action: Action): void;
    getState(): Observable<T>;
    setInitialState(state: any): void;
}
