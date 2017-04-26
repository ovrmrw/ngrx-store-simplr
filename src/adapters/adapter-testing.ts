import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'

import { Action } from '../common'
import { Adapter } from './adapter'
import { Wrapper } from '../wrapper'


export class AdapterForTesting<T> extends Adapter<T> {
  testing = true
  private wrapper: Wrapper<T> = new Wrapper<T>()
  private fakeState: T

  constructor(initialState?: T) {
    super()
    this.fakeState = initialState || {} as any
  }

  setState<K extends keyof T>(action: Action, key: K): void {
    const state = this.fakeState[key]
    if (state !== undefined) {
      const reducer = this.wrapper.createWrappedReducer(key)
      const newState = reducer(state, action)
      this.fakeState[key] = newState
    } else {
      throw new Error(key + ' is not found in fakeState keys.')
    }
  }

  getState(): Observable<T> {
    return this.currentState$
  }

  get currentState$(): Observable<T> {
    return Observable.of(this.fakeState)
  }

  setInitialState(state: T): void {
    this.fakeState = state
  }
}
