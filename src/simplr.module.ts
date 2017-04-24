import { NgModule, ModuleWithProviders } from '@angular/core'
import { Store } from '@ngrx/store'

import { Simplr } from './simplr'
import { Adapter, AdapterForNgrxStore, AdapterForTesting } from './adapters'
import { createSimplr, createAdapterForNgrxStore, createAdapterForTesting } from './ngx'
import { INITIAL_STATE } from './common'


@NgModule({})
export class SimplrModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SimplrModule,
      providers: [
        { provide: Adapter, useFactory: createAdapterForNgrxStore, deps: [Store] },
        { provide: Simplr, useFactory: createSimplr, deps: [Adapter] },
      ]
    }
  }

  static forTesting<T>(initialState?: T): ModuleWithProviders {
    return {
      ngModule: SimplrModule,
      providers: [
        { provide: INITIAL_STATE, useValue: initialState },
        { provide: Adapter, useFactory: createAdapterForTesting, deps: [INITIAL_STATE] },
        { provide: Simplr, useFactory: createSimplr, deps: [Adapter] },
      ]
    }
  }
}
