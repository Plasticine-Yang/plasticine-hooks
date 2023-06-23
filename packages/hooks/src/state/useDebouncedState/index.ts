import { useEffect, useState } from 'react'

import type { DebounceOptions } from '../../shared'
import { useDebouncedFn } from '../../effect'

type UseDebouncedStateOptions = DebounceOptions

export function useDebouncedState<State>(state: State, options?: UseDebouncedStateOptions) {
  const [debouncedState, setDebouncedState] = useState(state)

  const { run: debouncedSetState } = useDebouncedFn(setDebouncedState, options)

  useEffect(() => {
    debouncedSetState(state)
  }, [])
}
