import { NgModule } from '@angular/core'
import { Simplr } from '../simplr'
import { Adapter, AdapterForNgrxStore } from '../adapters'


@NgModule({
  providers: [
    { provide: Adapter, useClass: AdapterForNgrxStore },
    Simplr,
  ]
})
export class SimplrModule { }
