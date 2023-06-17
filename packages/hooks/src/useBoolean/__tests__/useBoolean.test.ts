import { act, renderHook } from '@testing-library/react'

import { useBoolean } from '../useBoolean'

const setup = (defaultValue?: boolean) => renderHook(() => useBoolean(defaultValue))

describe('useBoolean', () => {
  test('actions: toggle', () => {
    const { result } = setup()

    expect(result.current[0]).toBe(false)

    act(() => {
      result.current[1].toggle()
    })
    expect(result.current[0]).toBe(true)

    act(() => {
      result.current[1].toggle()
    })

    expect(result.current[0]).toBe(false)
  })

  test('actions: setTrue', () => {
    const { result } = setup()

    expect(result.current[0]).toBe(false)

    act(() => {
      result.current[1].setTrue()
    })
    expect(result.current[0]).toBe(true)
  })

  test('actions: setFalse', () => {
    const { result } = setup()

    expect(result.current[0]).toBe(false)

    act(() => {
      result.current[1].setFalse()
    })
    expect(result.current[0]).toBe(false)
  })

  test('actions: set', () => {
    const { result } = setup()

    expect(result.current[0]).toBe(false)

    // set to true
    act(() => {
      result.current[1].set(true)
    })
    expect(result.current[0]).toBe(true)

    // set to false
    act(() => {
      result.current[1].set(false)
    })
    expect(result.current[0]).toBe(false)
  })

  test('test on default value', () => {
    const { result: result1 } = setup()
    expect(result1.current[0]).toBe(false)

    const { result: result2 } = setup(true)
    expect(result2.current[0]).toBe(true)
  })
})
