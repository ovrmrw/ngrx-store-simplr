import { NgModule } from '@angular/core'
import { Simplr } from '../simplr'
import { Adapter, AdapterForTesting } from '../adapters'


/**
 * DEPRECATED
 */
@NgModule({
  providers: [
    { provide: Adapter, useClass: AdapterForTesting },
    Simplr,
  ]
})
export class SimplrTestingModule { }
