import debounce from 'lodash/debounce'
import { useMemo, useRef } from 'react'

import { useUnmount } from '../../lifeCycle'
import { resolveDebounceOptions, type DebounceOptions } from '../../shared'
import type { AnyFn } from '../../types'

type UseDebouncedFnOptions = DebounceOptions

export function useDebouncedFn<T extends AnyFn>(fn: T, options?: UseDebouncedFnOptions) {
  const { wait, ...debounceOptions } = resolveDebounceOptions(options)

  const fnRef = useRef(fn)

  const debouncedFn = useMemo(() => {
    return debounce(
      (...args: Parameters<T>): ReturnType<T> => {
        return fnRef.current(...args)
      },
      wait,
      debounceOptions,
    )
  }, [])

  useUnmount(() => {
    debouncedFn.cancel()
  })

  return {
    run: debouncedFn,
    cancel: debouncedFn.cancel,
    flush: debouncedFn.flush,
  }
}
