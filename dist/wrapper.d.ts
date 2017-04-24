import { ActionReducer } from '@ngrx/store';
export declare class Wrapper<T> {
    mergeReducersIntoWrappedReducers<K extends keyof T>(reducers: NullableActionReducer<T>): ActionReducer<T>;
    createWrappedReducer<K extends keyof T>(key: K, innerReducer?: ActionReducer<T[K]> | null): ActionReducer<T[K]>;
    getActionKeysForSimplr<K extends keyof T>(key: K): {
        _UPDATE_: string;
        _FAILED_: string;
    };
    private createUpdateKey(key);
    private createFailedKey(key);
}
export declare type NullableActionReducer<T> = {
    [K in keyof T]: ActionReducer<T[K]> | null | undefined;
};
