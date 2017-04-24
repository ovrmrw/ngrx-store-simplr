import { NgModule, ModuleWithProviders } from '@angular/core'

import { Simplr } from './simplr'
import { Adapter, AdapterForNgrxStore, AdapterForTesting } from './adapters'
import { createSimplr } from './common'


@NgModule({})
export class SimplrModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SimplrModule,
      providers: [
        { provide: Adapter, useClass: AdapterForNgrxStore },
        { provide: Simplr, useFactory: createSimplr, deps: [Adapter] },
      ]
    }
  }

  static forTesting(): ModuleWithProviders {
    return {
      ngModule: SimplrModule,
      providers: [
        { provide: Adapter, useClass: AdapterForTesting },
        { provide: Simplr, useFactory: createSimplr, deps: [Adapter] },
      ]
    }
  }
}
