import { Adapter } from '../'
import { AdapterForTesting } from '../adapters'


interface TestState {
  a: number,
  b: number,
}

const initialState: TestState = {
  a: 0,
  b: 0,
}


describe('Adapter Test', () => {
  let adapter: Adapter<TestState>

  beforeEach(() => {
    adapter = new AdapterForTesting(initialState)
  })

  describe('Adapter', () => {
    it('should be created', () => {
      expect(adapter).toBeTruthy()
    })

    it('should return a state as Observable', async () => {
      const state = await adapter.currentState$.toPromise()
      expect(state).toEqual(initialState)
    })

    it('can overwrite initial state', async () => {
      adapter.setInitialState({ ...initialState, b: 9 })
      const state = await adapter.currentState$.toPromise()
      expect(state).not.toEqual(initialState)
      expect(state).toEqual({ a: 0, b: 9 })
    })
  })
})
