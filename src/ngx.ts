import { Injectable, Provider, OpaqueToken, InjectionToken, NgModule, ModuleWithProviders } from '@angular/core'
import { Store } from '@ngrx/store'

import { Simplr } from './simplr'
import { Wrapper } from './wrapper'
import { SimplrOptions, SIMPLR_OPTIONS } from './common'



export function _createSimplr(store, options): any {
  return new Simplr(store, options)
};


// export function provideSimplrProviders(options: SimplrOptions = {}) {
//   return [
//     Wrapper,
//     { provide: SIMPLR_OPTIONS, useValue: options },
//     { provide: Simplr, useFactory: _createSimplr, deps: [Store, SIMPLR_OPTIONS] },
//     // { provide: Simplr, useClass: SimplrInjectable },
//   ]
// }
