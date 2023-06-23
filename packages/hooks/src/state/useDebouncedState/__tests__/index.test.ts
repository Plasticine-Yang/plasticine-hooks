import { act, renderHook } from '@testing-library/react'
import { useState } from 'react'

import { sleep } from '../../../testingHelpers'
import { useDebouncedState } from '..'

describe('useDebouncedState', () => {
  const setup = (state: any, options?: { wait?: number; leading?: boolean; trailing?: boolean; maxWait?: number }) =>
    renderHook(() => {
      const debouncedState = useDebouncedState(state, options)

      return debouncedState
    })

  test('should be updated with debounce', async () => {
    const [state, setState] = useState(1)
    const add = () => setState((prevState) => prevState + 1)

    const { result } = setup(state, { wait: 500 })
    expect(result.current).toBe(1)

    act(() => {
      add()
      add()
      add()
    })
    expect(result.current).toBe(1)
    await sleep(500)
    expect(result.current).toBe(2)
  })

  test('should be updated on leading', async () => {
    const [state, setState] = useState(1)
    const add = () => setState((prevState) => prevState + 1)

    const { result } = setup(state, { wait: 500, leading: true })
    expect(result.current).toBe(1)

    act(() => {
      add()
      add()
      add()
    })
    expect(result.current).toBe(2)
    await sleep(500)
    expect(result.current).toBe(3)
  })

  test('should be updated after maxWait milliseconds', async () => {
    const [state, setState] = useState(1)
    const add = () => setState((prevState) => prevState + 1)

    const { result } = setup(state, { wait: 500, maxWait: 1000 })
    expect(result.current).toBe(1)

    await act(async () => {
      add()
      await sleep(400)
    })
    expect(result.current).toBe(1)

    await act(async () => {
      add()
      await sleep(400)
    })
    expect(result.current).toBe(1)

    await act(async () => {
      add()
      await sleep(400)
    })
    expect(result.current).toBe(2)
  })
})
