import { NgModule, ModuleWithProviders } from '@angular/core'

import { Simplr } from './simplr'
import { Adapter, AdapterForNgRedux, AdapterForTesting } from './adapters'
import { createSimplr } from './common'


@NgModule({})
export class SimplrNgReduxModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SimplrNgReduxModule,
      providers: [
        { provide: Adapter, useClass: AdapterForNgRedux },
        { provide: Simplr, useFactory: createSimplr, deps: [Adapter] },
      ]
    }
  }

  static forTesting(): ModuleWithProviders {
    return {
      ngModule: SimplrNgReduxModule,
      providers: [
        { provide: Adapter, useClass: AdapterForTesting },
        { provide: Simplr, useFactory: createSimplr, deps: [Adapter] },
      ]
    }
  }
}
