import { useMemo } from 'react'
import { useToggle } from '../useToggle'

export interface UseBooleanActions {
  /** 在 true 和 false 之间切换 */
  toggle: () => void

  /** 将状态值设为 true */
  setTrue: () => void

  /** 将状态值设为 false */
  setFalse: () => void
}

/**
 * 优雅地管理 boolean 状态
 *
 * @param defaultValue 默认 false
 */
export function useBoolean(defaultValue = false): [boolean, UseBooleanActions] {
  const [state, { toggle, setOn, setOff }] = useToggle(defaultValue)

  const actions: UseBooleanActions = useMemo(() => {
    return {
      toggle,
      setTrue: setOn,
      setFalse: setOff,
    }
  }, [])

  return [state, actions]
}
