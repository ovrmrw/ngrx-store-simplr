# ngrx-store-simplr
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
  counter: CounterState;
}

export interface CounterState {
  value: number;
}
```

Create `reducer` and `initialState` to import into `app.module.ts`.

```ts
// app/store/reducer.ts

import { combineReducers } from '@ngrx/store';
import { Wrapper } from 'ngrx-store-simplr';
import { AppState } from './models';

const wrapper = new Wrapper<AppState>();

const finalReducer = combineReducers({
  counter: wrapper.createWrappedReducer('counter')
});

export function reducer(state, action) {
  return finalReducer(state, action);
}

export const initialState: AppState = {
  counter: {
    value: 0
  }
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

  increment(num: number) {
    this.simplr.dispatch('counter', (state) => ({ value: state.value + num }));
  }

  reset() {
    this.simplr.dispatch('counter', ({ ...initialState.counter }));
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
    <button (click)="decrement()">decrement</button>
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
    this.service.increment(1);
  }

  decrement() {
    this.service.increment(-1);
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
this.simplr.dispatch('counter', (state) => ({ value: state.value + 1 }))
// or
this.simplr.dispatch('counter', ({ value: 1 }))
// or 
this.simplr.dispatch('counter', Promise.resolve((state) => ({ value: state.value + 1 })))
// or
this.simplr.dispatch('counter', Promise.resolve({ value: 1 }))
// or
this.simplr.dispatch('counter', Observable.of((state) => ({ value: state.value + 1 })))
// or
this.simplr.dispatch('counter', Observable.of({ value: 1 }))
```
