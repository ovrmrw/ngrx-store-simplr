import { combineReducers } from '@ngrx/store';
import { Wrapper } from '../../../../../src';

import { AppState } from './models/state';
import { booksReducer } from './reducers/books';


const wrapper = new Wrapper<AppState>();

const finalReducer = combineReducers({
  books: wrapper.wrapReducerWithCaseUpdate('books', booksReducer)
});

export function reducer(state, action) {
  return finalReducer(state, action);
}


export const initialState: AppState = {
  books: {
    terms: '',
    books: [],
  }
};
