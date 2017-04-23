import { Simplr, Wrapper } from '../'
import { Adapter, AdapterForTesting } from '../'
import { Observable } from 'rxjs/Observable'


interface TestState {
  timestamp: {
    local: number,
    server: number,
  }
}

const initialState: TestState = {
  timestamp: {
    local: 0,
    server: 0,
  }
}

const { _UPDATE_, _FAILED_ } = new Wrapper<TestState>().getActionKeysForSimplr('timestamp')


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

    it('can dispatch deep nested callback', async () => {
      adapter.setInitialState({ ...initialState })
      const result1 = await simplr.dispatch('timestamp', (1)).toPromise()
      const result2 = await simplr.dispatch('timestamp', ('foo')).toPromise()
      const result3 = await simplr.dispatch('timestamp', (true)).toPromise()
      const result4 = await simplr.dispatch('timestamp', ([])).toPromise()
      const result5 = await simplr.dispatch('timestamp', ({})).toPromise()
      expect(result1.action).toEqual({ type: _FAILED_ })
      expect(result2.action).toEqual({ type: _FAILED_ })
      expect(result3.action).toEqual({ type: _FAILED_ })
      expect(result4.action).toEqual({ type: _FAILED_ })
      expect(result5.action).toEqual({ type: _UPDATE_, payload: {} })
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
