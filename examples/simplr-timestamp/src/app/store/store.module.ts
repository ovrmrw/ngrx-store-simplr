import { NgModule, Injector, ModuleWithProviders } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { initialState, reducer } from './reducer';
// import { options } from './index';
import { SIMPLR_OPTIONS, Simplr, _createSimplr, SimplrOptions } from '../../../../../dist';

// export const options: SimplrOptions = { logging: true };


@NgModule({
  imports: [
    StoreModule.provideStore(reducer, initialState)
  ]
})
export class MyStoreModule {
  static forRoot(options: SimplrOptions = { logging: true, timeout: 1000, retry: 3 }): ModuleWithProviders {
    return {
      ngModule: MyStoreModule,
      providers: [
        // { provide: SIMPLR_OPTIONS, useValue: options },
        Simplr,
        // { provide: Simplr, useFactory: _createSimplr, deps: [Store, Injector] }

      ]
    };
  }
}