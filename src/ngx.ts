// import { Injectable, Provider, OpaqueToken, InjectionToken, NgModule, ModuleWithProviders } from '@angular/core'
// import { Store } from '@ngrx/store'
import { Simplr } from './simplr'
import { Adapter, AdapterForNgrxStore, AdapterForTesting } from './adapters'


// export function createSimplr(store): any {
//   return new Simplr(store)
// };


export function provideSimplr() {
  return [
    { provide: Adapter, useClass: AdapterForNgrxStore },
    Simplr,
  ]
}


export function provideSimplrForTesting() {
  return [
    { provide: Adapter, useClass: AdapterForTesting },
    Simplr,
  ]
}
