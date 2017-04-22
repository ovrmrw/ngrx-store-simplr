import { NgModule, ModuleWithProviders } from '@angular/core'
import { Simplr } from '../simplr'
import { Adapter, AdapterForNgrxStore, AdapterForTesting } from '../adapters'


@NgModule({})
export class SimplrModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SimplrModule,
      providers: [
        { provide: Adapter, useClass: AdapterForNgrxStore },
        Simplr,
      ]
    }
  }

  static forTesting(): ModuleWithProviders {
    return {
      ngModule: SimplrModule,
      providers: [
        { provide: Adapter, useClass: AdapterForTesting },
        Simplr,
      ]
    }
  }
}
