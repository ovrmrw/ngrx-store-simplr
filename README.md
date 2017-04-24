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
  counter: null // if you have the reducer for counter key, set here instead of null.
});

const rootReducer = combineReducers(wrappedReducers);

export function reducer(state, action) { // workaround for AoT build
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
import { Simplr, Adapter, AdapterForNgrxStore } from 'ngrx-store-simplr';
import { reducer, initialState } from './store/reducer';

@NgModule({
  declarations: [ ... ],
  imports: [ ...,
    StoreModule.provideStore(reducer, initialState),
  ],
  providers: [
    Simplr,
    { provide: Adapter, useClass: AdapterForNgrxStore },
  ],
  bootstrap: [ ... ]
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
Did you notice that you write no actions and no reducers?

---

## Demos

- [simplr-counter on GitHub Pages](https://ovrmrw.github.io/simplr-counter/)
- [simplr-timestamp on GitHub Pages](https://ovrmrw.github.io/simplr-timestamp/)

---

## Details

### dispatch

`dispatch` function allows below sync and async writings.

```ts
this.simplr.dispatch('counter', (state) => state + 1 }))
// or
this.simplr.dispatch('counter', 1))
// or 
this.simplr.dispatch('counter', Promise.resolve((state) => state + 1 ))
// or
this.simplr.dispatch('counter', Promise.resolve(1))
// or
this.simplr.dispatch('counter', Observable.of((state) => state + 1 ))
// or
this.simplr.dispatch('counter', Observable.of(1))
```
