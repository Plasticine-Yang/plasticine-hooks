// export * from './useDebouncedFn'

import type { DebounceSettings } from 'lodash'
import debounce from 'lodash/debounce'
import { useMemo, useRef } from 'react'

type AnyFn = (...args: any[]) => any

type UseDebouncedFnOptions = DebounceSettings & {
  /**
   * 防抖的时间间隔
   *
   * @default 1000
   */
  wait?: number
}

interface UseDebouncedFnActions {
  run: () => void
  cancel: () => void
  flush: () => void
}

const DEFAULT_WAIT = 1000
const DEFAULT_LEADING = false
const DEFAULT_TRAILING = true

export function useDebouncedFn<T extends AnyFn>(fn: T, options?: UseDebouncedFnOptions) {
  const { wait, leading, trailing, maxWait } = resolveOptions(options)

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

function resolveOptions(options?: UseDebouncedFnOptions): UseDebouncedFnOptions {
  return {
    wait: options?.wait ?? DEFAULT_WAIT,
    leading: options?.leading ?? DEFAULT_LEADING,
    trailing: options?.trailing ?? DEFAULT_TRAILING,
    maxWait: options?.maxWait,
  }
}
