import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { State } from '@ngrx/store';

import { AppState } from '../store';
import { BooksService } from '../services/books';


@Component({
  selector: 'app-books-container',
  template: `
    <div>
      <input type="text" [value]="value">
      <button (click)="send()">send</button>
    </div>  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksContainerComponent implements OnInit {
  value = '123';

  constructor(
    private service: BooksService,
    private state$: State<AppState>,
  ) { }

  ngOnInit() {
    this.state$.subscribe(state => {
      console.log('newState:', state);
    });
  }

  send() {
    this.service.search(this.value);
  }
}
