import { NgModule, Injector, ModuleWithProviders } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { SimplrModule, Simplr, Adapter, AdapterForNgrxStore } from '../../../../../dist';

import { initialState, reducer } from './reducer';


@NgModule({
  imports: [
    StoreModule.provideStore(reducer, initialState),
    // SimplrModule,
  ]
})
export class MyStoreModule { }
