import { NgModule, ModuleWithProviders } from '@angular/core'

import { Simplr } from './simplr'
import { Adapter, AdapterForNgrxStore, AdapterForNgRedux, AdapterForTesting } from './adapters'
import { createSimplr } from './common'


@NgModule({})
export class SimplrModule {
  static forRoot(): ModuleWithProviders {
    return SimplrModule.forNgrxStore()
  }

  static forNgrxStore(): ModuleWithProviders {
    return {
      ngModule: SimplrModule,
      providers: [
        { provide: Adapter, useClass: AdapterForNgrxStore },
        { provide: Simplr, useFactory: createSimplr, deps: [Adapter] },
      ]
    }
  }

  static forNgRedux(): ModuleWithProviders {
    return {
      ngModule: SimplrModule,
      providers: [
        { provide: Adapter, useClass: AdapterForNgRedux },
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
