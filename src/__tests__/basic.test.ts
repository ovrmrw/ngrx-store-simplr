import { Simplr } from '../'
import { Adapter, AdapterForTesting } from '../'


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

    it('should return a state as Observable', async () => {
      adapter.setInitialState({ ...initialState })
      await simplr.dispatch('timestamp', (state) => ({ local: state.local + 1 })).toPromise()
      await simplr.dispatch('timestamp', (state) => ({ local: state.local + 1 })).toPromise()
      const state = await adapter.getState().toPromise()
      expect(state.timestamp.local).toBe(2)
      expect(state.timestamp).toEqual({ local: 2, server: 0 })
    })
  })
})
