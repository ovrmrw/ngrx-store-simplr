import { InjectionToken } from '@angular/core'
import { Action } from '@ngrx/store'

export { Action, ActionReducer } from '@ngrx/store'


export const INITIAL_STATE = new InjectionToken<any>('InitialState')

export interface SimplrOptions {
  logging?: boolean,
  timeout?: number,
  retry?: number,
}

export interface Result<T, K extends keyof T> {
  action: Action,
  state: T,
  partial: T[K],
}
