import { Simplr, Wrapper, Adapter } from '../'
import { AdapterForTesting } from '../adapters'
import { Observable } from 'rxjs/Rx'


interface TestState {
  timestamp: {
    local: number,
    server: number,
  },
  counter: number,
  flag: boolean,
  array: string[],
}

const initialState: TestState = {
  timestamp: {
    local: 0,
    server: 0,
  },
  counter: 1,
  flag: true,
  array: ['a', 'b'],
}


describe('Basic Test', () => {
  let adapter: Adapter<TestState>
  let simplr: Simplr<TestState>
  const wrapper = new Wrapper<TestState>()

  beforeEach(() => {
    adapter = new AdapterForTesting({ ...initialState })
    simplr = new Simplr(adapter)
  })

  describe('Simplr', () => {
    it('should create an instance', () => {
      expect(simplr).toBeTruthy()
    })

    it('can dispatch callback as both sync and async', async () => {
      const state = await Observable
        .merge(...[
          simplr.dispatch('timestamp', (s) => ({ local: s.local + 1 })).toPromise(),
          simplr.dispatch('timestamp', Promise.resolve((s) => ({ local: s.local + 1 }))).toPromise(),
          simplr.dispatch('timestamp', Observable.of((s) => ({ local: s.local + 1 }))).toPromise(),
        ])
        .last()
        .map(result => result.state)
        .toPromise()
      expect(state.timestamp).toEqual({ local: 3, server: 0 })
    })

    it('can dispatch direct value as both sync and async', async () => {
      const state = await Observable
        .merge(...[
          simplr.dispatch('timestamp', ({ local: 1 })).toPromise(),
          simplr.dispatch('timestamp', Promise.resolve({ local: 1 })).toPromise(),
          simplr.dispatch('timestamp', Observable.of({ local: 1 })).toPromise(),
        ])
        .last()
        .map(result => result.state)
        .toPromise()
      expect(state.timestamp).toEqual({ local: 1, server: 0 })
    })

    it('can dispatch deep nested callback', async () => {
      const state = await Observable
        .merge(...[
          simplr.dispatch('timestamp', ({ local: 1 })).toPromise(),
          simplr.dispatch('timestamp', (state) => () => () => () => ({ local: state.local + 1 })).toPromise(),
        ])
        .last()
        .map(result => result.state)
        .toPromise()
      expect(state.timestamp).toEqual({ local: 2, server: 0 })
    })

    it('can dispatch number', async () => {
      const { _UPDATE_, _FAILED_ } = wrapper.getActionKeysForSimplr('counter')
      const result = await simplr.dispatch('counter', (state) => state - 1).toPromise()
      expect(result.action).toEqual({ type: _UPDATE_, payload: 0 })
      expect(result.state.counter).toBe(0)
    })

    it('can dispatch boolean', async () => {
      const { _UPDATE_, _FAILED_ } = wrapper.getActionKeysForSimplr('flag')
      const result = await simplr.dispatch('flag', false).toPromise()
      expect(result.action).toEqual({ type: _UPDATE_, payload: false })
      expect(result.state.flag).toBe(false)
    })

    it('can dispatch array', async () => {
      const { _UPDATE_, _FAILED_ } = wrapper.getActionKeysForSimplr('array')
      const result = await simplr.dispatch('array', (state) => [...state, 'c']).toPromise()
      expect(result.action).toEqual({ type: _UPDATE_, payload: ['a', 'b', 'c'] })
      expect(result.state.array).toEqual(['a', 'b', 'c'])
    })
  })

  describe('Adapter', () => {
    it('should create an instance', () => {
      expect(adapter).toBeTruthy()
    })

    it('should return a state as Observable', async () => {
      const state = await adapter.getState().toPromise()
      expect(state).toEqual(initialState)
    })

    it('can overwrite initial state', async () => {
      adapter.setInitialState({ ...initialState, counter: 9 })
      const state = await adapter.getState().toPromise()
      expect(state).not.toEqual(initialState)
      expect(state.counter).toBe(9)
    })
  })
})
