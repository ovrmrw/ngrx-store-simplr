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

  setState(action: Action): Action {
    this.store.dispatch(action)
    return action
  }

  getState(): Observable<T> {
    return this.currentState$
  }

  get currentState$(): Observable<T> {
    return this.store.select(s => s)
  }

  setInitialState(state): void {
    throw new Error('Use setInitialState function only for testing.')
  }
}
