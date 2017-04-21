import { ActionReducer } from '@ngrx/store';

import { BooksState } from '../models/state';
import * as books from '../actions/books';


export const booksReducer: ActionReducer<BooksState> =
  (state, action: books.ActionsForBooks) => {
    switch (action.type) {
      case books.REQUEST:
        console.log('request action:', action);
        return state;

      default:
        return state;
    }
  };
