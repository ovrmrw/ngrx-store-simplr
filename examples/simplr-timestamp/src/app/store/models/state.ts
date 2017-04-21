import { Book } from './book';


export interface AppState {
  books: BooksState;
}

export interface BooksState {
  terms: string;
  books: Book[];
}
