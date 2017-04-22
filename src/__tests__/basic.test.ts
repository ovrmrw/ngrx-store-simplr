import { Simplr } from '../'
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
