import { NgModule, ModuleWithProviders } from '@angular/core'
import { Store } from '@ngrx/store'

import { Simplr } from './simplr'
import { Adapter, AdapterForNgrxStore, AdapterForTesting } from './adapters'
import { createSimplr, createAdapterForNgrxStore, createAdapterForTesting } from './ngx'


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

  static forTesting(): ModuleWithProviders {
    return {
      ngModule: SimplrModule,
      providers: [
        { provide: Adapter, useFactory: createAdapterForTesting },
        { provide: Simplr, useFactory: createSimplr, deps: [Adapter] },
      ]
    }
  }
}
