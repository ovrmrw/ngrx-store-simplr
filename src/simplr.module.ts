import { NgModule, ModuleWithProviders } from '@angular/core'

import { Store, INITIAL_STATE, GLOBAL_OPTIONS, GlobalOptions } from './common'
import { Simplr } from './simplr'
import { Adapter, AdapterForNgrxStore, AdapterForTesting } from './adapters'
import { createSimplr, createAdapterForNgrxStore, createAdapterForTesting } from './ngx'



@NgModule({})
export class SimplrModule {
  static forRoot(options?: GlobalOptions): ModuleWithProviders {
    return {
      ngModule: SimplrModule,
      providers: [
        { provide: GLOBAL_OPTIONS, useValue: options },
        { provide: Adapter, useFactory: createAdapterForNgrxStore, deps: [Store] },
        { provide: Simplr, useFactory: createSimplr, deps: [Adapter, GLOBAL_OPTIONS] },
      ]
    }
  }

  static forTesting<T>(initialState?: T, options?: GlobalOptions): ModuleWithProviders {
    return {
      ngModule: SimplrModule,
      providers: [
        { provide: GLOBAL_OPTIONS, useValue: options },
        { provide: INITIAL_STATE, useValue: initialState },
        { provide: Adapter, useFactory: createAdapterForTesting, deps: [INITIAL_STATE] },
        { provide: Simplr, useFactory: createSimplr, deps: [Adapter, GLOBAL_OPTIONS] },
      ]
    }
  }
}
