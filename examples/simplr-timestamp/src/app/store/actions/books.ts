import { Action } from '@ngrx/store';
import { Wrapper, Resolver } from '../../../../../../dist';

import { AppState } from '../models/state';

const wrapper = new Wrapper<AppState>();

export const { _UPDATE_, _FAILED_ } = wrapper.createActionKeys('books');
export type Resolver = Resolver<AppState, 'books'>;


export const REQUEST = 'books RQUEST';

export class ActionRequest implements Action {
  readonly type = REQUEST;
  constructor(public payload?: undefined) { }
}

export type ActionsForBooks
  = ActionRequest;
