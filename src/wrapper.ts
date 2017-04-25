import { Action, ActionReducer, NullableActionReducers } from './common'


export class Wrapper<T> {
  mergeReducersIntoWrappedReducers<K extends keyof T>(reducers: NullableActionReducers<T>): ActionReducer<T> {
    const keys = Object.keys(reducers) as K[]
    const finalReducers: ActionReducer<T> =
      keys.reduce((p, key) => {
        const reducer = reducers[key]
        p[key] = this.createWrappedReducer(key, reducer)
        return p
      }, {} as any)
    return finalReducers
  }

  createWrappedReducer<K extends keyof T>(key: K, innerReducer?: ActionReducer<T[K]> | null): ActionReducer<T[K]> {
    const { _UPDATE_, _FAILED_ } = this.getActionKeysForSimplr(key)

    return function outerReducer(state: T[K], action: Action): T[K] {
      switch (action.type) {
        case _UPDATE_:
          if (action.payload instanceof Object && !(action.payload instanceof Array)) {
            return {
              ...state as any,
              ...action.payload,
            }
          } else if (action.payload instanceof Array) {
            return [...action.payload] as any
          } else {
            return action.payload
          }

        case _FAILED_:
          return state

        default:
          return innerReducer ? innerReducer(state, action) : state
      }
    }
  }

  getActionKeysForSimplr<K extends keyof T>(key: K) {
    return {
      _UPDATE_: this.createUpdateKey(key),
      _FAILED_: this.createFailedKey(key),
    }
  }

  private createUpdateKey(key: string): string {
    return key + ' @UPDATE@'
  }

  private createFailedKey(key: string): string {
    return key + ' @FAILED@'
  }
}
