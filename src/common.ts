import { OpaqueToken } from '@angular/core'
import { Action, ActionReducer } from '@ngrx/store'

export { Store, Action, ActionReducer, combineReducers } from '@ngrx/store'


export const INITIAL_STATE = new OpaqueToken('InitialState')
export const GLOBAL_OPTIONS = new OpaqueToken('GlobalOptions')

export interface GlobalOptions {
  // enableAsyncFlag?: boolean,
  enableAsyncActions?: boolean,
}

export interface SimplrOptions {
  logging?: boolean,
  timeout?: number,
  retry?: number,
  desc?: any,
}

export interface Result<T, K extends keyof T> {
  action: Action,
  actions: Action[],
  state: T,
  partial: T[K],
}

export type NullableActionReducers<T> = {
  [K in keyof T]: ActionReducer<T[K]> | null
}
