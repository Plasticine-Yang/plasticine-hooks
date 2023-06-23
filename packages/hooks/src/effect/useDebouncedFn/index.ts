import debounce from 'lodash/debounce'
import { useMemo, useRef } from 'react'

import { type DebounceOptions, resolveDebounceOptions } from '../../shared'

type AnyFn = (...args: any[]) => any

type UseDebouncedFnOptions = DebounceOptions

interface UseDebouncedFnActions {
  run: () => void
  cancel: () => void
  flush: () => void
}

export function useDebouncedFn<T extends AnyFn>(fn: T, options?: UseDebouncedFnOptions) {
  const { wait, leading, trailing, maxWait } = resolveDebounceOptions(options)

  const fnRef = useRef(fn)

  const actions = useMemo<UseDebouncedFnActions>(() => {
    const debouncedFn = debounce(
      (...args: Parameters<T>): ReturnType<T> => {
        return fnRef.current(...args)
      },
      wait,
      { leading, maxWait, trailing },
    )

    return {
      run: debouncedFn,
      cancel: debouncedFn.cancel,
      flush: debouncedFn.flush,
    }
  }, [])

  return actions
}
