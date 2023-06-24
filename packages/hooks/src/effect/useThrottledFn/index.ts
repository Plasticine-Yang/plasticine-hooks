import throttle from 'lodash/throttle'
import { useMemo, useRef } from 'react'

import { useUnmount } from '../../lifeCycle'
import { resolveThrottleOptions, type ThrottleOptions } from '../../shared'
import type { AnyFn } from '../../types'

type UseThrottledFnOptions = ThrottleOptions

export function useThrottledFn<T extends AnyFn>(fn: T, options?: UseThrottledFnOptions) {
  const { wait, leading, trailing } = resolveThrottleOptions(options)

  const fnRef = useRef(fn)
  // fnRef.current = fn

  const throttledFn = useMemo(() => {
    return throttle(
      (...args: Parameters<T>): ReturnType<T> => {
        return fnRef.current(...args)
      },
      wait,
      { leading, trailing },
    )
  }, [])

  useUnmount(() => {
    throttledFn.cancel()
  })

  return {
    run: throttledFn,
    cancel: throttledFn.cancel,
    flush: throttledFn.flush,
  }
}
