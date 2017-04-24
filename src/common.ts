// import { InjectionToken } from '@angular/core'
import { Action as NgrxAction } from '@ngrx/store'
import { Action as ReduxAction } from 'redux'
import { Simplr } from './simplr'


export interface Action extends NgrxAction, ReduxAction {
  type: string,
  payload?: any,
}


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


export function createSimplr(adapter) {
  return new Simplr(adapter)
}
