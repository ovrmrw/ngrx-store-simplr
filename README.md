# Simplr
A wrapper library for @ngrx/store to use Redux concept in an easy way.

---

Maybe your desires:

- like to use Redux.
- but writing many actions and reducers is painful.
- very painful.
- to handle async actions is so painful.
- finding an easy way to use Redux concept.
- want to use Angular and RxJS.

Here Simplr comes into play.

## Install

```
$ npm install --save @ngrx/core @ngrx/store ngrx-store-simplr
```

You also need to install Angular and RxJS.

---

## Examples

- [simplr-counter](https://github.com/ovrmrw/simplr-counter)
- [simplr-timestamp](https://github.com/ovrmrw/simplr-timestamp)

---

## Usage

Declare the app state interfaces.

```ts
// app/store/models/index.ts

export interface AppState {
  counter: number;
}
```

Create `reducer` and `initialState` to import into `app.module.ts`.

```ts
// app/store/reducer.ts

import { combineReducers } from '@ngrx/store';
import { Wrapper } from 'ngrx-store-simplr';
import { AppState } from './models';

const wrapper = new Wrapper<AppState>();

const wrappedReducers = wrapper.mergeReducersIntoWrappedReducers({
  counter: null // if you have a reducer for this key, set it here instead of null.
});

const rootReducer = combineReducers(wrappedReducers);

export function reducer(state, action) { // workaround for AoT compile
  return rootReducer(state, action);
}

export const initialState: AppState = {
  counter: 0
};
```

Edit `app.module.ts` in order to use Simplr.

```ts
// app/app.module.ts

import { StoreModule } from '@ngrx/store';
import { SimplrModule } from 'ngrx-store-simplr';
import { reducer, initialState } from './store/reducer';

@NgModule({
  imports: [ 
    ...,
    StoreModule.provideStore(reducer, initialState), // <== Add
    SimplrModule.forRoot(), // <== Add
  ],
})
export class AppModule { }
```

Create a service to dispatch to the store.

```ts
// app/services/counter.ts

import { Simplr } from 'ngrx-store-simplr';
import { AppState } from '../store/models';
import { initialState } from '../store/reducer';

@Injectable()
export class CounterService {
  constructor(
    private simplr: Simplr<AppState>,
  ) { }

  increment() {
    this.simplr.dispatch('counter', (state) => state + 1);
  }

  reset() {
    this.simplr.dispatch('counter', initialState.counter);
  }
}
```

Create a component to call service functions.

```ts
// app/containers/counter.ts

import { State } from '@ngrx/store';
import { AppState } from '../store/models';
import { CounterService } from '../services/counter';

@Component({
  selector: 'app-counter-container',
  template: `
    <button (click)="increment()">increment</button>
    <button (click)="reset()">reset</button>
    <pre>{{ state$ | async | json }}</pre>
  `
})
export class CounterContainerComponent {
  constructor(
    public state$: State<AppState>,
    private service: CounterService,
  ) { }

  increment() {
    this.service.increment();
  }

  reset() {
    this.service.reset();
  }
}
```

Done!  
Did you notice that you wrote no actions and no reducers?

---

## Demos

- [simplr-counter on GitHub Pages](https://ovrmrw.github.io/simplr-counter/)
- [simplr-timestamp on GitHub Pages](https://ovrmrw.github.io/simplr-timestamp/)

---

## Details

### dispatch

#### `dispatch` function allows below sync and async writings.

```ts
this.simplr.dispatch('counter', (state) => state + 1 ) // callback
// or
this.simplr.dispatch('counter', 1) // value
// or 
this.simplr.dispatch('counter', Promise.resolve((state) => state + 1 )) // callback in Promise
// or
this.simplr.dispatch('counter', Promise.resolve(1)) // value in Promise
// or
this.simplr.dispatch('counter', Observable.of((state) => state + 1 )) // callback in Observable
// or
this.simplr.dispatch('counter', Observable.of(1)) // value in Observable
```

#### `dispatch` function returns Observable result especially for testing.

```ts
interface Result<T, K extends keyof T> {
  action: Action,
  state: T,
  partial: T[K],
}
```

```ts
// getting Action
const action: Observable<Action> = 
  this.simplr
    .dispatch('counter', (state) => state + 1 )
    .map(result => result.action)

// getting current whole state
const state: Observable<AppState> =
  this.simplr
    .dispatch('counter', (state) => state + 1 )
    .map(result => result.state) // state ==> { counter: 1 }

// getting current state under the key
const partial: Observable<number> =
  this.simplr
    .dispatch('counter', (state) => state + 1 )
    .map(result => result.partial) // partial ==> 1
```
