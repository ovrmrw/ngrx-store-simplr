import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, Inject, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BooksContainerComponent } from './containers/books';
import { BooksService } from './services/books';

import { MyStoreModule } from './store/store.module';
import { Simplr, Adapter, AdapterForNgrxStore } from '../../../../dist';


@NgModule({
  declarations: [
    AppComponent,
    BooksContainerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MyStoreModule,
  ],
  providers: [
    BooksService,
    Simplr,
    { provide: Adapter, useClass: AdapterForNgrxStore },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
