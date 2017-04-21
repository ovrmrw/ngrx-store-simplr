import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BooksContainerComponent } from './containers/books';
import { BooksService } from './services/books';
// import { MyStoreModule } from './store';

import { StoreModule } from '@ngrx/store';
import { SimplrModule } from '../../../../dist';
import { reducer, initialState } from './store';


@NgModule({
  declarations: [
    AppComponent,
    BooksContainerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // MyStoreModule.forRoot(),
    StoreModule.provideStore(reducer, initialState),
    SimplrModule.forRoot({ logging: true }),
  ],
  providers: [
    BooksService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
