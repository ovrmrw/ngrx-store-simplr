import { Provider, InjectionToken } from '@angular/core'
import { Store } from '@ngrx/store'

import { Simplr } from './simplr'
import { Wrapper } from './wrapper'


export interface Options {
  logging?: boolean
  timeout?: number
  retry?: number
}

export const SimplrOptions = new InjectionToken<Options>('Token Simplr Options')

export function _createSimplr(store, wrapper, options): Simplr<any> {
  return new Simplr(store, wrapper, options)
}

export function createSimplrProviders(options: Options = {}): Provider[] {
  return [
    Wrapper,
    { provide: SimplrOptions, useValue: options },
    { provide: Simplr, useFactory: _createSimplr, deps: [Store, Wrapper, SimplrOptions] },
  ]
}
