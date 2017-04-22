// import { Injectable, Inject, Optional } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Adapter } from './adapter'


export class AdapterForTesting<T> extends Adapter<T> {
  testing = true

  private fakeState: Partial<T>

  setState(action): void {
    console.warn('Use setState function for NOT testing case.')
  }

  getState(): Observable<T> {
    return Observable.of(this.fakeState || {})
  }

  setTestingState(state: Partial<T>): void {
    this.fakeState = state
  }
}
