import { Wrapper } from '../'


interface TestState {
  timestamp: {
    local: number,
    server: number,
  },
  counter: number,
  flag: boolean,
  array: string[],
}

const testReducers = {
  timestamp: null,
  counter: null,
  flag: null,
  array: null,
}


describe('Wrapper Test', () => {
  let wrapper: Wrapper<TestState>

  beforeEach(() => {
    wrapper = new Wrapper<TestState>()
  })

  describe('Wrapper', () => {
    it('should be created', () => {
      expect(wrapper).toBeTruthy()
    })

    describe('mergeReducersIntoWrappedReducers', () => {
      it('created reducer has the same keys with the argument reducer', () => {
        const reducer = wrapper.mergeReducersIntoWrappedReducers(testReducers)
        const keys = Object.keys(reducer)
        expect(keys).toEqual(['timestamp', 'counter', 'flag', 'array'])
      })

      it('created reducer has replaced as wrapped reducer for each keys', () => {
        const reducer = wrapper.mergeReducersIntoWrappedReducers(testReducers)
        Object.keys(reducer).forEach(key => {
          const func = reducer[key]
          expect(func).toBeInstanceOf(Function)
          expect(func.name).toBe('outerReducer')
        })
      })
    })
  })
})
