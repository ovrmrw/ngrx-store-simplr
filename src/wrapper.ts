import { ActionReducer, Action } from '@ngrx/store'


export class Wrapper<T> {
  wrapReducerForSimplr<K extends keyof T>(key: K, innerReducer: ActionReducer<T[K]>): ActionReducer<T[K]> {
    const { _UPDATE_, _FAILED_ } = this.getActionKeysForSimplr(key)

    return function outerReducer(state: T[K], action: Action): T[K] {
      switch (action.type) {
        case _UPDATE_:
          return {
            ...state as any,
            ...action.payload,
          }

        case _FAILED_:
          return state

        default:
          return innerReducer(state, action)
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
