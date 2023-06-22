import { act, renderHook } from '@testing-library/react'

import { useToggle } from '../useToggle'

describe('useToggle', () => {
  const setup = (valueOff?: any, valueOn?: any, defaultOn?: boolean) =>
    renderHook(() => {
      const [state, { toggle, setOn, setOff }] = useToggle(valueOff, valueOn, defaultOn)

      return {
        state,
        toggle,
        setOn,
        setOff,
      }
    })

  test('should setOn and setOff work', () => {
    const valueOff = 'valueOff'
    const valueOn = 'valueOn'
    const { result } = setup(valueOff, valueOn)

    expect(result.current.state).toBe(valueOff)

    act(() => {
      result.current.setOn()
    })
    expect(result.current.state).toBe(valueOn)

    act(() => {
      result.current.setOff()
    })
    expect(result.current.state).toBe(valueOff)
  })

  test('should defaultOn control initial state', () => {
    const valueOff = 'valueOff'
    const valueOn = 'valueOn'
    const hook1 = setup(valueOff, valueOn, true)
    const hook2 = setup(valueOff, valueOn, false)
    const hook3 = setup(valueOff) // default value of defaultOn parameter is `false`

    expect(hook1.result.current.state).toBe(valueOn)
    expect(hook2.result.current.state).toBe(valueOff)
    expect(hook3.result.current.state).toBe(valueOff)
  })

  test('should be boolean state when not pass any parameters', () => {
    const { result } = setup()

    expect(result.current.state).toBe(false)

    act(() => {
      result.current.setOn()
    })
    expect(result.current.state).toBe(true)

    act(() => {
      result.current.setOff()
    })
    expect(result.current.state).toBe(false)
  })

  test('should toggle state between valueOff and valueOn', () => {
    const valueOff = 'valueOff'
    const valueOn = 'valueOn'
    const { result } = setup(valueOff, valueOn)

    expect(result.current.state).toBe(valueOff)

    act(() => {
      result.current.toggle()
    })
    expect(result.current.state).toBe(valueOn)

    act(() => {
      result.current.toggle()
    })
    expect(result.current.state).toBe(valueOff)
  })
})
