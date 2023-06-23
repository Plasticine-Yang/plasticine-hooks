import { act, renderHook } from '@testing-library/react'

import { useBoolean } from '..'

const setup = (defaultValue?: boolean) =>
  renderHook(() => {
    const [state, { toggle, setTrue, setFalse }] = useBoolean(defaultValue)

    return {
      state,
      toggle,
      setTrue,
      setFalse,
    }
  })

describe('useBoolean', () => {
  test('should default state be false', () => {
    const { result } = setup()
    expect(result.current.state).toBe(false)
  })

  test('should setTrue and setFalse work', () => {
    const { result } = setup()

    act(() => {
      result.current.setTrue()
    })
    expect(result.current.state).toBe(true)

    act(() => {
      result.current.setFalse()
    })
    expect(result.current.state).toBe(false)
  })

  test('should toggle between false and true', () => {
    const { result } = setup()

    expect(result.current.state).toBe(false)

    act(() => {
      result.current.toggle()
    })
    expect(result.current.state).toBe(true)

    act(() => {
      result.current.toggle()
    })

    expect(result.current.state).toBe(false)
  })
})
