import { NgModule, ModuleWithProviders } from '@angular/core'
import { Simplr } from '../simplr'
import { Adapter, AdapterForNgrxStore } from '../adapters'


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
}
