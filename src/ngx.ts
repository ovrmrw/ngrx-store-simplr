import { Injectable, Provider, OpaqueToken, InjectionToken, NgModule, ModuleWithProviders } from '@angular/core'
import { Store } from '@ngrx/store'

import { Simplr } from './simplr'
import { Wrapper } from './wrapper'
import { Options } from './common'



export function _createSimplr(store, wrapper, options) {
  return new Simplr<any>(store, wrapper, options)
};


// export function createSimplrProviders(options: Options = {}) {
//   return [
//     Wrapper,
//     { provide: SimplrOptions, useValue: options },
//     { provide: Simplr, useFactory: _createSimplr, deps: [Store, Wrapper, SimplrOptions] },
//     // { provide: Simplr, useClass: SimplrInjectable },
//   ]
// }
