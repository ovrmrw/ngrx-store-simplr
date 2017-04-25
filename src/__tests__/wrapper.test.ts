import { Wrapper, ActionReducer, NullableActionReducers } from '../'


interface TestState {
  a: number
  b: number,
  c: number,
  d: number,
}

const testReducers: NullableActionReducers<TestState> = {
  a: null,
  b: null,
  c: null,
  d: (state, action) => state,
}


describe('Wrapper Test', () => {
  const wrapper = new Wrapper<TestState>()

  describe('Wrapper', () => {
    it('should be created', () => {
      expect(wrapper).toBeTruthy()
    })

    describe('mergeReducersIntoWrappedReducers', () => {
      it('created reducer has the same keys with the argument reducer', () => {
        const reducers = wrapper.mergeReducersIntoWrappedReducers(testReducers)
        const keys = Object.keys(reducers)
        expect(keys).toEqual(['a', 'b', 'c', 'd'])
      })

      it('created reducer has replaced as wrapped reducer for each keys', () => {
        const reducers = wrapper.mergeReducersIntoWrappedReducers(testReducers)
        Object.keys(reducers).forEach(key => {
          const func = reducers[key]
          expect(func).toBeInstanceOf(Function)
          expect(func.name).toBe('outerReducer')
        })
      })
    })
  })
})
