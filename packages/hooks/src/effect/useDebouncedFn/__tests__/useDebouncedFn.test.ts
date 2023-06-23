import { act, renderHook } from '@testing-library/react'

import { sleep } from '../../../testingHelpers'
import { useDebouncedFn } from '..'

describe('useDebouncedFn', () => {
  jest.useFakeTimers()

  const setup = (
    fn: (...args: any[]) => any,
    options?: { wait?: number; leading?: boolean; trailing?: boolean; maxWait?: number },
  ) =>
    renderHook(() => {
      const { run, cancel, flush } = useDebouncedFn(fn, options)

      return {
        run,
        cancel,
        flush,
      }
    })

  test('should be executed after specific milliseconds', async () => {
    const fn = jest.fn()

    const { result } = setup(fn, { wait: 500 })
    expect(fn).not.toHaveBeenCalled()

    await act(async () => {
      result.current.run()

      await sleep(300)

      result.current.run()
      result.current.run()
      result.current.run()
    })
    expect(fn).not.toHaveBeenCalled()

    await act(async () => {
      result.current.run()
      await sleep(600)
    })
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('should work when not pass any options', async () => {
    const fn = jest.fn()

    const { result } = setup(fn)
    expect(fn).not.toHaveBeenCalled()

    await act(async () => {
      result.current.run()
      await sleep(1000)
    })
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

    await act(async () => {
      result.current.run()
      result.current.run()
      result.current.run()
      await sleep(600)
    })
    expect(fn).toHaveBeenCalledTimes(2)

    await act(async () => {
      result.current.run()
      result.current.run()
      result.current.run()
      await sleep(500)
      result.current.run()
    })
    expect(fn).toHaveBeenCalledTimes(5)
  })

  test('should be executed after maxWait milliseconds', async () => {
    const fn = jest.fn()

    const { result } = setup(fn, { wait: 500, maxWait: 1000 })
    expect(fn).not.toHaveBeenCalled()

    await act(async () => {
      result.current.run()
      await sleep(400)
    })
    expect(fn).not.toHaveBeenCalled()

    await act(async () => {
      result.current.run()
      await sleep(400)
    })
    expect(fn).not.toHaveBeenCalled()

    await act(async () => {
      result.current.run()
      await sleep(400)
    })
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('should be canceled when cancel is called', async () => {
    const fn = jest.fn()

    const { result } = setup(fn, { wait: 500 })
    expect(fn).not.toHaveBeenCalled()

    await act(async () => {
      result.current.run()
      await sleep(400)
      result.current.cancel()
      await sleep(100)
    })
    expect(fn).not.toHaveBeenCalled()

    await act(async () => {
      result.current.run()
      await sleep(500)
    })
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('should be executed immediately when flush is called', async () => {
    const fn = jest.fn()

    const { result } = setup(fn, { wait: 500 })
    expect(fn).not.toHaveBeenCalled()

    await act(async () => {
      result.current.run()
      await sleep(400)
      result.current.flush()
    })
    expect(fn).toHaveBeenCalledTimes(1)

    await act(async () => {
      result.current.run()
      await sleep(500)
    })
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
