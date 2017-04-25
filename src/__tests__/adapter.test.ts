import { Adapter } from '../'
import { AdapterForTesting } from '../adapters'
// import { Observable } from 'rxjs/Rx'


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


describe('Adapter Test', () => {
  let adapter: Adapter<TestState>

  beforeEach(() => {
    adapter = new AdapterForTesting({ ...initialState })
  })

  describe('Adapter', () => {
    it('should be created', () => {
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
