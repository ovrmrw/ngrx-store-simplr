import { Observable } from 'rxjs/Observable'

import { Store, Action } from '../common'
import { Adapter } from './adapter'


export class AdapterForNgrxStore<T> extends Adapter<T> {
  testing = false

  constructor(
    private store: Store<T>,
  ) {
    super()
  }

  setState(action: Action): void {
    this.store.dispatch(action)
  }

  getState(): Observable<T> {
    return this.store.select(s => s)
  }

  setInitialState(state): void {
    console.warn('Use setInitialState function only for testing.')
  }
}
