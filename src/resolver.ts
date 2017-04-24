import { Observable } from 'rxjs/Observable'


// export type Resolver<T, K extends keyof T> = (partial: T[K], all: T) => Partial<T[K]>
// export type AsyncResolver<T, K extends keyof T> = Resolver<T, K> | Promise<Resolver<T, K>> | Observable<Resolver<T, K>>


export type Value<T, K extends keyof T> = T[K]
export type AsyncValue<T, K extends keyof T> = Promise<Value<T, K>> | Observable<Value<T, K>>
export type Resolver<T, K extends keyof T> = (partial: T[K], all: T) => T[K]
export type AsyncResolver<T, K extends keyof T> = Promise<Resolver<T, K>> | Observable<Resolver<T, K>>

export type ValueOrResolver<T, K extends keyof T> =
  Value<T, K> | Resolver<T, K> |
  AsyncValue<T, K> | AsyncResolver<T, K>

export type SyncValueOrResolver<T, K extends keyof T> =
  Value<T, K> | Resolver<T, K>

export type AsyncValueOrResolver<T, K extends keyof T> =
  AsyncValue<T, K> | AsyncResolver<T, K>



export type PartialValue<T, K extends keyof T> = Partial<T[K]>
export type PartialAsyncValue<T, K extends keyof T> = Promise<PartialValue<T, K>> | Observable<PartialValue<T, K>>
export type PartialResolver<T, K extends keyof T> = (partial: T[K], all: T) => Partial<T[K]>
export type PartialAsyncResolver<T, K extends keyof T> = Promise<PartialResolver<T, K>> | Observable<PartialResolver<T, K>>

export type PartialValueOrResolver<T, K extends keyof T> =
  PartialValue<T, K> | PartialResolver<T, K> |
  PartialAsyncValue<T, K> | PartialAsyncResolver<T, K>

export type PartialSyncValueOrResolver<T, K extends keyof T> =
  PartialValue<T, K> | PartialResolver<T, K>

export type PartialAsyncValueOrResolver<T, K extends keyof T> =
  PartialAsyncValue<T, K> | PartialAsyncResolver<T, K>
