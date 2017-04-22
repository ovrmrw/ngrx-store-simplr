import { InjectionToken } from '@angular/core'
import { Action } from '@ngrx/store'

export interface SimplrOptions {
  logging?: boolean
  timeout?: number
  retry?: number
}

export const SIMPLR_OPTIONS = new InjectionToken<SimplrOptions>('Token Simplr Options')




export interface Result<T, K extends keyof T> {
  action: Action
  state: T
  partial: T[K]
}
