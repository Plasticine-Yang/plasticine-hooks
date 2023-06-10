import { useMemo, useState } from 'react'

export interface UseBooleanActions {
  /** 在 true 和 false 之间切换 */
  toggle: () => void

  /** 将状态值设为 true */
  setTrue: () => void

  /** 将状态值设为 false */
  setFalse: () => void

  /** 设置状态值 */
  set: (value: boolean) => void
}

/**
 *
 * @param defaultValue 默认 false
 */
export function useBoolean(defaultValue = false): [boolean, UseBooleanActions] {
  const [state, setState] = useState(defaultValue)

  const actions: UseBooleanActions = useMemo(() => {
    const toggle = () => setState((prevState) => !prevState)

    const setTrue = () => setState(true)

    const setFalse = () => setState(false)

    const set = (value: any) => setState(!!value)

    return {
      toggle,
      setTrue,
      setFalse,
      set,
    }
  }, [])

  return [state, actions]
}
