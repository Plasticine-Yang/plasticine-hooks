import { act, renderHook } from '@testing-library/react'

import { sleep } from '../../../testingHelpers'
import { useThrottledFn } from '..'

describe('useThrottledFn', () => {
  jest.useFakeTimers()

  const setup = (fn: (...args: any[]) => any, options?: { wait?: number; leading?: boolean; trailing?: boolean }) =>
    renderHook(() => {
      const { run, cancel, flush } = useThrottledFn(fn, options)

      return {
        run,
        cancel,
        flush,
      }
    })

  test('should be executed once when run multi times on a specific milliseconds', async () => {
    const fn = jest.fn()

    const { result } = setup(fn, { wait: 500 })
    expect(fn).not.toHaveBeenCalled()

    await act(async () => {
      result.current.run()
    })
    expect(fn).not.toHaveBeenCalled()
    await sleep(500)
    expect(fn).toHaveBeenCalledTimes(1)

    await act(async () => {
      result.current.run()
      result.current.run()
      result.current.run()
    })
    expect(fn).toHaveBeenCalledTimes(1)
    await sleep(500)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  test('should work when not pass any options', async () => {
    const fn = jest.fn()

    const { result } = setup(fn)
    expect(fn).not.toHaveBeenCalled()

    await act(async () => {
      result.current.run()
    })
    expect(fn).not.toHaveBeenCalled()
    await sleep(1000)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('should be executed on leading', async () => {
    const fn = jest.fn()

    const { result } = setup(fn, { wait: 500, leading: true })
    expect(fn).not.toHaveBeenCalled()

    act(() => {
      result.current.run()
    })
    expect(fn).toHaveBeenCalledTimes(1)
    await sleep(500)
    expect(fn).toHaveBeenCalledTimes(1)

    act(() => {
      result.current.run()
      result.current.run()
      result.current.run()
    })
    expect(fn).toHaveBeenCalledTimes(2)
    await sleep(500)
    expect(fn).toHaveBeenCalledTimes(3)
  })

  test('should be executed on trailing', async () => {
    const fn = jest.fn()

    const { result } = setup(fn, { wait: 500, trailing: true })
    expect(fn).not.toHaveBeenCalled()

    act(() => {
      result.current.run()
    })
    expect(fn).not.toHaveBeenCalled()
    await sleep(500)
    expect(fn).toHaveBeenCalledTimes(1)

    act(() => {
      result.current.run()
      result.current.run()
      result.current.run()
    })
    expect(fn).toHaveBeenCalledTimes(1)
    await sleep(500)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  test('should be canceled when cancel is called', async () => {
    const fn = jest.fn()

    const { result } = setup(fn, { wait: 500 })
    expect(fn).not.toHaveBeenCalled()

    act(() => {
      result.current.run()
      result.current.run()
    })
    expect(fn).not.toHaveBeenCalled()
    await sleep(500)
    expect(fn).toHaveBeenCalledTimes(1)

    act(() => {
      result.current.run()
      result.current.run()
      result.current.cancel()
    })
    expect(fn).toHaveBeenCalledTimes(1)
    await sleep(500)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('should be executed immediately when flush is called', async () => {
    const fn = jest.fn()

    const { result } = setup(fn, { wait: 500 })
    expect(fn).not.toHaveBeenCalled()

    act(() => {
      result.current.run()
      result.current.run()
    })
    expect(fn).not.toHaveBeenCalled()
    await sleep(500)
    expect(fn).toHaveBeenCalledTimes(1)

    act(() => {
      result.current.run()
      result.current.run()
      result.current.flush()
    })
    expect(fn).toHaveBeenCalledTimes(2)
    await sleep(500)
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
