import { Simplr } from './simplr';
import { Adapter, AdapterForNgrxStore, AdapterForTesting } from './adapters';
/**
 * DEPRECATED
 */
export declare function provideSimplr(): (typeof Simplr | {
    provide: typeof Adapter;
    useClass: typeof AdapterForNgrxStore;
})[];
/**
 * DEPRECATED
 */
export declare function provideSimplrForTesting(): (typeof Simplr | {
    provide: typeof Adapter;
    useClass: typeof AdapterForTesting;
})[];
