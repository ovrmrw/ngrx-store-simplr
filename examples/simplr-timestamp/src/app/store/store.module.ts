import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { initialState, reducer } from './reducer';


@NgModule({
  imports: [
    StoreModule.provideStore(reducer, initialState),
  ]
})
export class MyStoreModule { }
