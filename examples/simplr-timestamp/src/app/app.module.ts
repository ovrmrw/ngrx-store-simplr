import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, Inject, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BooksContainerComponent } from './containers/books';
import { BooksService } from './services/books';
import { MyStoreModule } from './store/store.module';

import { StoreModule, Store } from '@ngrx/store';
import { Simplr, SIMPLR_OPTIONS, SimplrOptions, /*provideSimplrProviders*/ _createSimplr } from '../../../../dist';
import { reducer, initialState } from './store';

// const o = { logging: true }


@NgModule({
  declarations: [
    AppComponent,
    BooksContainerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyStoreModule.forRoot({ logging: true, timeout: 1000, retry: 3 }),
    // StoreModule.provideStore(reducer, initialState),
    // SimplrModule.forRoot({ logging: true }),
  ],
  providers: [
    BooksService,
    // { provide: SIMPLR_OPTIONS, useValue: options },
    // Simplr,
    // { provide: Simplr, useFactory: _createSimplr, deps: [Store, Injector] }
    // { provide: Simplr, useClass: Simplr2 }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
