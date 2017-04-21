import { NgModule, ModuleWithProviders } from '@angular/core'
import { Store } from '@ngrx/store'

import { _createSimplr } from './ngx'
import { Options, SimplrOptions } from './common'
import { Wrapper } from './wrapper'
import { Simplr } from './simplr'


@NgModule()
export class SimplrModule {
  static forRoot(options: Options = {}): ModuleWithProviders {
    return {
      ngModule: SimplrModule,
      providers: [
        { provide: Store, useExisting: Store },
        Wrapper,
        { provide: SimplrOptions, useValue: options },
        { provide: Simplr, useFactory: _createSimplr, deps: [Store, Wrapper, SimplrOptions] },
      ]
    }
  }
}
