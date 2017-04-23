// import { Injectable, Inject, Optional } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Action } from '../common'
import { Adapter } from './adapter'
import { Wrapper } from '../wrapper'


export class AdapterForTesting<T> extends Adapter<T> {
  testing = true
  private fakeState: Partial<T> = {}
  private wrapper: Wrapper<T> = new Wrapper<T>()

  setState<K extends keyof T>(action: Action, key: K): void {
    const state = this.fakeState[key]
    if (state !== undefined) {
      const reducer = this.wrapper.createWrappedReducer(key)
      this.fakeState[key] = reducer(state, action)
    } else {
      console.error(key + ' is not found in fakeState keys.')
    }
  }

  getState(): Observable<T> {
    return Observable.of(this.fakeState)
  }

  setInitialState(state: Partial<T>): void {
    this.fakeState = state
  }
}
