import { Simplr, Wrapper } from '../'
import { Adapter, AdapterForTesting } from '../'
import { Observable } from 'rxjs/Observable'


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

  beforeEach(() => {
    adapter = new AdapterForTesting()
    simplr = new Simplr(adapter)
  })

  describe('Simplr', () => {
    it('should create an instance', () => {
      expect(simplr).toBeTruthy()
    })

    it('can dispatch callback as both sync and async', async () => {
      adapter.setInitialState({ ...initialState })
      await simplr.dispatch('timestamp', (s) => ({ local: s.local + 1 })).toPromise()
      await simplr.dispatch('timestamp', Promise.resolve((s) => ({ local: s.local + 1 }))).toPromise()
      await simplr.dispatch('timestamp', Observable.of((s) => ({ local: s.local + 1 }))).toPromise()
      const state = await adapter.getState().toPromise()
      expect(state.timestamp.local).toBe(3)
      expect(state.timestamp).toEqual({ local: 3, server: 0 })
    })

    it('can dispatch direct value as both sync and async', async () => {
      adapter.setInitialState({ ...initialState })
      await simplr.dispatch('timestamp', ({ local: 1 })).toPromise()
      await simplr.dispatch('timestamp', Promise.resolve({ local: 1 })).toPromise()
      await simplr.dispatch('timestamp', Observable.of({ local: 1 })).toPromise()
      const state = await adapter.getState().toPromise()
      expect(state.timestamp.local).toBe(1)
      expect(state.timestamp).toEqual({ local: 1, server: 0 })
    })

    it('can dispatch deep nested callback', async () => {
      adapter.setInitialState({ ...initialState })
      await simplr.dispatch('timestamp', ({ local: 1 })).toPromise()
      await simplr.dispatch('timestamp', (state) => () => () => () => ({ local: state.local + 1 })).toPromise()
      const state = await adapter.getState().toPromise()
      expect(state.timestamp.local).toBe(2)
      expect(state.timestamp).toEqual({ local: 2, server: 0 })
    })

    it('can dispatch number', async () => {
      const { _UPDATE_, _FAILED_ } = new Wrapper<TestState>().getActionKeysForSimplr('counter')
      adapter.setInitialState({ ...initialState })
      const result = await simplr.dispatch('counter', (state) => state - 1).toPromise()
      expect(result.action).toEqual({ type: _UPDATE_, payload: 0 })
      const state = await adapter.getState().toPromise()
      expect(state.counter).toBe(0)
    })

    it('can dispatch boolean', async () => {
      const { _UPDATE_, _FAILED_ } = new Wrapper<TestState>().getActionKeysForSimplr('flag')
      adapter.setInitialState({ ...initialState })
      const result = await simplr.dispatch('flag', false).toPromise()
      expect(result.action).toEqual({ type: _UPDATE_, payload: false })
      const state = await adapter.getState().toPromise()
      expect(state.flag).toBe(false)
    })

    it('can dispatch array', async () => {
      const { _UPDATE_, _FAILED_ } = new Wrapper<TestState>().getActionKeysForSimplr('array')
      adapter.setInitialState({ ...initialState })
      const result = await simplr.dispatch('array', (state) => [...state, 'c']).toPromise()
      expect(result.action).toEqual({ type: _UPDATE_, payload: ['a', 'b', 'c'] })
      const state = await adapter.getState().toPromise()
      expect(state.array).toEqual(['a', 'b', 'c'])
    })
  })

  describe('Adapter', () => {
    it('should create an instance', () => {
      expect(adapter).toBeTruthy()
    })

    it('should return a state as Observable', async () => {
      adapter.setInitialState({ ...initialState })
      const state = await adapter.getState().toPromise()
      expect(state).toEqual(initialState)
    })
  })
})
