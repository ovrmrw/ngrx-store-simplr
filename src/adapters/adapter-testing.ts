import { Observable } from 'rxjs/Observable'
import { Action } from '../common'
import { Adapter } from './adapter'
import { Wrapper } from '../wrapper'


export class AdapterForTesting<T> extends Adapter<T> {
  testing = true
  private wrapper: Wrapper<T> = new Wrapper<T>()
  private fakeState: T | undefined

  constructor(initialState?: T) {
    super()
    if (initialState) {
      this.fakeState = initialState
    }
  }

  setState<K extends keyof T>(action: Action, key: K): void {
    if (this.fakeState) {
      const state = this.fakeState[key]
      if (state !== undefined) {
        const reducer = this.wrapper.createWrappedReducer(key)
        this.fakeState[key] = reducer(state, action)
      } else {
        throw new Error(key + ' is not found in fakeState keys.')
      }
    } else {
      throw new Error('fakeState is undefined.')
    }
  }

  getState(): Observable<T> {
    return Observable.of(this.fakeState)
  }

  setInitialState(state: T): void {
    this.fakeState = state
  }
}
