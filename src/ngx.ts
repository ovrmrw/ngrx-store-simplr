import { Store } from './common'
import { Simplr } from './simplr'
import { Adapter, AdapterForNgrxStore, AdapterForTesting } from './adapters'


export function createSimplr<T>(adapter: Adapter<T>): Simplr<T> {
  return new Simplr<T>(adapter)
}

export function createAdapterForNgrxStore<T>(store: Store<T>): Adapter<T> {
  return new AdapterForNgrxStore<T>(store)
}

export function createAdapterForTesting<T>(initialState?: T): Adapter<T> {
  return new AdapterForTesting<T>(initialState)
}
