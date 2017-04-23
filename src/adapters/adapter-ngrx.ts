import { Injectable, Inject, Optional } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { Action } from '../common'
import { Adapter } from './adapter'


@Injectable()
export class AdapterForNgrxStore<T> extends Adapter<T> {
  testing = false

  constructor(
    @Inject(Store) @Optional()
    private store: Store<T>,
  ) {
    super()
    if (!this.store) {
      throw new Error('Token "Store" for @ngrx/store is not found.')
    }
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
