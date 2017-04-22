import { Injectable } from '@angular/core';
import { Dispatcher, Action } from '@ngrx/store';
import { Simplr } from '../../../../../src';

import { AppState, Book } from '../store';
import * as books from '../store/actions/books';


const termsResolverWithTerms: (data: string) => books.Resolver =
  (newTerms) => (state) => {
    const terms = newTerms;
    return { terms };
  };

const booksResolverWithBooks: (data: Book[]) => books.Resolver =
  (newBooks) => (state) => {
    const books = [...state.books, ...newBooks];
    return { books };
  };


@Injectable()
export class BooksService {
  constructor(
    private simplr: Simplr<AppState>,
    // private dispatcher$: Dispatcher,
  ) { }

  async search(terms: string): Promise<Action[]> {
    const dummyData: Book[] = [{ id: 1, volumeInfo: {} }, { id: 2, volumeInfo: {} }];
    const asyncResolver = Promise.resolve(dummyData).then(booksResolverWithBooks);

    const result1 = await this.simplr.dispatch('books', termsResolverWithTerms(terms)).toPromise();
    const result2 = await this.simplr.dispatch('books', asyncResolver).toPromise();
    return [result1.action, result2.action];
  }
}
