import { Observable } from 'rxjs/Rx'
import { Simplr, Wrapper, Adapter } from '../'
import { AdapterForTesting } from '../adapters'


interface TestState {
  timestamp: {
    local: number,
    server: number,
  },
  counter: number,
  str: string,
  flag: boolean,
  array: string[],
}

const initialState: TestState = {
  timestamp: {
    local: 0,
    server: 0,
  },
  counter: 1,
  str: 'foo',
  flag: true,
  array: ['a', 'b'],
}


describe('Simplr Test', () => {
  let adapter: Adapter<TestState>
  let simplr: Simplr<TestState>
  const wrapper = new Wrapper<TestState>()

  beforeEach(() => {
    adapter = new AdapterForTesting(initialState)
    simplr = new Simplr(adapter)
  })

  describe('Simplr', () => {
    it('should be created', () => {
      expect(simplr).toBeTruthy()
    })

    it('can dispatch callback as both sync and async', async () => {
      const state =
        await Observable
          .merge(...[
            simplr.dispatch('timestamp', (s) => ({ local: s.local + 1 })).toPromise(),
            simplr.dispatch('timestamp', Promise.resolve((s) => ({ local: s.local + 1 }))).toPromise(),
            simplr.dispatch('timestamp', Observable.of((s) => ({ local: s.local + 1 }))).toPromise(),
          ])
          .last()
          .map(result => result.state).toPromise()
      expect(state.timestamp).toEqual({ local: 3, server: 0 })
    })

    it('can dispatch direct value as both sync and async', async () => {
      const state =
        await Observable
          .merge(...[
            simplr.dispatch('timestamp', ({ local: 1 })).toPromise(),
            simplr.dispatch('timestamp', Promise.resolve({ local: 1 })).toPromise(),
            simplr.dispatch('timestamp', Observable.of({ local: 1 })).toPromise(),
          ])
          .last()
          .map(result => result.state).toPromise()
      expect(state.timestamp).toEqual({ local: 1, server: 0 })
    })

    it('can dispatch deep nested callback', async () => {
      const state =
        await Observable
          .merge(...[
            simplr.dispatch('timestamp', ({ local: 1 })).toPromise(),
            simplr.dispatch('timestamp', (state) => () => () => () => ({ local: state.local + 1 })).toPromise(),
          ])
          .last()
          .map(result => result.state).toPromise()
      expect(state.timestamp).toEqual({ local: 2, server: 0 })
    })

    it('can dispatch number', async () => {
      const { _UPDATE_, _FAILED_ } = wrapper.getActionKeysForSimplr('counter')
      const result =
        await Observable
          .merge(...[
            simplr.dispatch('counter', (state) => state - 1),
            simplr.dispatch('counter', (state, all) => state + all.array.length),
          ])
          .last().toPromise()
      expect(result.action).toEqual({ type: _UPDATE_, payload: 2 })
      expect(result.state.counter).toBe(2)
      expect(result.partial).toBe(2)
    })

    it('can dispatch string', async () => {
      const { _UPDATE_, _FAILED_ } = wrapper.getActionKeysForSimplr('str')
      const result =
        await Observable
          .merge(...[
            simplr.dispatch('str', ''),
            simplr.dispatch('str', (_, all) => all.array.join(',')),
          ])
          .last().toPromise()
      expect(result.action).toEqual({ type: _UPDATE_, payload: 'a,b' })
      expect(result.state.str).toBe('a,b')
      expect(result.partial).toBe('a,b')
    })

    it('can dispatch boolean', async () => {
      const { _UPDATE_, _FAILED_ } = wrapper.getActionKeysForSimplr('flag')
      const result =
        await Observable
          .merge(...[
            simplr.dispatch('flag', true),
            simplr.dispatch('flag', (state) => !state),
          ])
          .last().toPromise()
      expect(result.action).toEqual({ type: _UPDATE_, payload: false })
      expect(result.state.flag).toBe(false)
      expect(result.partial).toBe(false)
    })

    it('can dispatch array', async () => {
      const { _UPDATE_, _FAILED_ } = wrapper.getActionKeysForSimplr('array')
      const result =
        await Observable
          .merge(...[
            simplr.dispatch('array', (state) => [...state, 'c']),
            simplr.dispatch('array', (state, all) => [...state, all.str]),
          ])
          .last().toPromise()
      expect(result.action).toEqual({ type: _UPDATE_, payload: ['a', 'b', 'c', 'foo'] })
      expect(result.state.array).toEqual(['a', 'b', 'c', 'foo'])
      expect(result.partial).toEqual(['a', 'b', 'c', 'foo'])
    })

    describe('Description Option', () => {
      it('should add description to the Action', async () => {
        const { _UPDATE_, _FAILED_ } = wrapper.getActionKeysForSimplr('counter')
        const result = await simplr.dispatch('counter', 1, { desc: 'foobar' }).toPromise()
        expect(result.action).toEqual({ type: _UPDATE_, payload: 1, desc: 'foobar' })
      })
    })

    describe('Timeout Option', () => {
      it('should fail the Action taking time over timeout value', async () => {
        const { _UPDATE_, _FAILED_ } = wrapper.getActionKeysForSimplr('counter')
        const result = await simplr.dispatch('counter', Observable.of(1).delay(100), { timeout: 90 }).toPromise()
        expect(result.action).toEqual({ type: _FAILED_ })
      })
    })

    describe('Global Options - enableAsyncActions', () => {
      beforeEach(() => {
        simplr = new Simplr(adapter, { enableAsyncActions: true })
      })

      it('Sync resolver does not make START and FINISHED actions', async () => {
        const { _UPDATE_, _FAILED_, _START_, _FINISHED_ } = wrapper.getActionKeysForSimplr('counter')
        const result = await simplr.dispatch('counter', 1).toPromise()
        expect(result.actions).toEqual([
          { type: _UPDATE_, payload: 1 },
        ])
      })

      it('Promise resolver makes START and FINISHED actions', async () => {
        const { _UPDATE_, _FAILED_, _START_, _FINISHED_ } = wrapper.getActionKeysForSimplr('counter')
        const result = await simplr.dispatch('counter', Promise.resolve(2)).toPromise()
        expect(result.actions).toEqual([
          { type: _START_ },
          { type: _UPDATE_, payload: 2 },
          { type: _FINISHED_ },
        ])
      })

      it('Observable resolver makes START and FINISHED actions', async () => {
        const { _UPDATE_, _FAILED_, _START_, _FINISHED_ } = wrapper.getActionKeysForSimplr('counter')
        const result = await simplr.dispatch('counter', Observable.of(3)).toPromise()
        expect(result.actions).toEqual([
          { type: _START_ },
          { type: _UPDATE_, payload: 3 },
          { type: _FINISHED_ },
        ])
      })
    })
  })
})
