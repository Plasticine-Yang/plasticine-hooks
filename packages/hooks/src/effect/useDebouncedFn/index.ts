import debounce from 'lodash/debounce'
import { useMemo, useRef } from 'react'

import { type DebounceOptions, resolveDebounceOptions } from '../../shared'
import { useUnmount } from '../../lifeCycle'

type AnyFn = (...args: any[]) => any

type UseDebouncedFnOptions = DebounceOptions

interface UseDebouncedFnActions<T> {
  run: T
  cancel: () => void
  flush: () => void
}

export function useDebouncedFn<T extends AnyFn>(fn: T, options?: UseDebouncedFnOptions) {
  const { wait, leading, trailing, maxWait } = resolveDebounceOptions(options)

  const fnRef = useRef(fn)

  const actions = useMemo<UseDebouncedFnActions<T>>(() => {
    const debouncedFn = debounce(
      (...args: Parameters<T>): ReturnType<T> => {
        return fnRef.current(...args)
      },
      wait,
      { leading, maxWait, trailing },
    )

    return {
      run: debouncedFn as unknown as T,
      cancel: debouncedFn.cancel,
      flush: debouncedFn.flush,
    }
  }, [])

  useUnmount(() => {
    actions.cancel()
  })

  return actions
}
