import { Observable } from 'rxjs/Observable';
export declare type Value<T, K extends keyof T> = Partial<T[K]>;
export declare type AsyncValue<T, K extends keyof T> = Promise<Value<T, K>> | Observable<Value<T, K>>;
export declare type Resolver<T, K extends keyof T> = (partial: T[K], all: T) => Partial<T[K]>;
export declare type AsyncResolver<T, K extends keyof T> = Promise<Resolver<T, K>> | Observable<Resolver<T, K>>;
export declare type ValueOrResolver<T, K extends keyof T> = Value<T, K> | Resolver<T, K> | AsyncValue<T, K> | AsyncResolver<T, K>;
export declare type SyncValueOrResolver<T, K extends keyof T> = Value<T, K> | Resolver<T, K>;
export declare type AsyncValueOrResolver<T, K extends keyof T> = AsyncValue<T, K> | AsyncResolver<T, K>;
