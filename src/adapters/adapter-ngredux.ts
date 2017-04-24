import { Injectable, Inject, Optional } from '@angular/core'
import { NgRedux } from '@angular-redux/store'
import { Observable } from 'rxjs/Observable'

import { Action } from '../common'
import { Adapter } from './adapter'


@Injectable()
export class AdapterForNgRedux<T> extends Adapter<T> {
  testing = false

  constructor(
    @Inject(NgRedux) @Optional()
    private ngRedux: NgRedux<T>,
  ) {
    super()
    if (!this.ngRedux) {
      throw new Error('Token "NgRedux" for @angular-redux/store is not found.')
    }
  }

  setState(action: Action): void {
    this.ngRedux.dispatch(action)
  }

  getState(): Observable<T> {
    return this.ngRedux.select(s => s)
  }

  setInitialState(state): void {
    console.warn('Use setInitialState function only for testing.')
  }
}
