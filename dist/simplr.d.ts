import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { ValueOrResolver } from './resolver';
import { SimplrOptions, Result } from './common';
import { Adapter } from './adapters';
export declare class Simplr<T> {
    private adapter;
    private wrapper;
    constructor(adapter: Adapter<T>);
    dispatch<K extends keyof T>(key: K, resolver: ValueOrResolver<T, K>, options?: SimplrOptions): Observable<Result<T, K>>;
}
