// import { Injectable, Inject, Optional } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Action } from '../common'
import { Adapter } from './adapter'


export class AdapterForTesting<T> extends Adapter<T> {
  testing = true

  private fakeState: Partial<T> = {}

  setState<K extends keyof T>(action: Action, key: K): void {
    if (action.payload) {
      const state = this.fakeState[key]
      if (state) {
        const newState = {
          ...state as any,
          ...action.payload,
        }
        this.fakeState[key] = newState
      }
    }
  }

  getState(): Observable<T> {
    return Observable.of(this.fakeState)
  }

  setInitialState(state: Partial<T>): void {
    this.fakeState = state
  }
}
