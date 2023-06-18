import { act, renderHook } from '@testing-library/react'

import { useSetState } from '../useSetState'

describe('useSetState', () => {
  const setup = <T extends Record<PropertyKey, any>>(initialValue: T) =>
    renderHook(() => {
      const [state, setState] = useSetState(initialValue)

      return {
        state,
        setState,
      } as const
    })

  test('should support initialValue', () => {
    const { result } = setup({ foo: 'hello' })
    expect(result.current.state).toEqual({ foo: 'hello' })
  })

  test('should support object', () => {
    const { result } = setup<{ foo: string; bar?: string }>({ foo: 'hello' })

    act(() => {
      result.current.setState({ bar: 'hi' })
    })
    expect(result.current.state).toEqual({ foo: 'hello', bar: 'hi' })
  })

  test('should support function update', () => {
    const { result } = setup({ count: 0 })

    act(() => {
      result.current.setState((prev) => ({ count: prev.count + 1 }))
    })
    expect(result.current.state).toEqual({ count: 1 })
  })
})
