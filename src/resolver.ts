import { Observable } from 'rxjs/Observable'


export type Resolver<T, K extends keyof T> = (partial: T[K], all: T) => Partial<T[K]>
export type AsyncResolver<T, K extends keyof T> = Resolver<T, K> | Promise<Resolver<T, K>> | Observable<Resolver<T, K>>
