import { InjectionToken } from '@angular/core'
import { Action, ActionReducer } from '@ngrx/store'

export { Store, Action, ActionReducer } from '@ngrx/store'


export const INITIAL_STATE = new InjectionToken<any>('InitialState')
export const GLOBAL_OPTIONS = new InjectionToken<GlobalOptions>('GlobalOptions')

export interface GlobalOptions {
  enableAsyncFlag?: boolean,
}

export interface SimplrOptions {
  logging?: boolean,
  timeout?: number,
  retry?: number,
  desc?: any,
}

export interface Result<T, K extends keyof T> {
  action: Action,
  state: T,
  partial: T[K],
}

export type NullableActionReducers<T> = {
  [K in keyof T]: ActionReducer<T[K]> | null
}
