import { useMemo, useState } from 'react'

interface UseToggleActions {
  /** 在关闭状态和开启状态之间切换 */
  toggle: () => void

  /** 切换到开启状态 */
  setOn: () => void

  /** 切换到关闭状态 */
  setOff: () => void
}

function useToggle(): [boolean, UseToggleActions]

function useToggle<ValueOff>(valueOff: ValueOff): [ValueOff, UseToggleActions]

function useToggle<ValueOff, ValueOn>(valueOff: ValueOff, valueOn?: ValueOn): [ValueOff | ValueOn, UseToggleActions]

/**
 * 优雅地管理开启和关闭状态
 *
 * @param valueOff 关闭状态下的状态值
 * @param valueOn 开启状态下的状态值
 * @param defaultOn 默认的状态值是否取用开启状态下的状态值
 */
function useToggle<ValueOff, ValueOn>(
  valueOff: ValueOff,
  valueOn?: ValueOn,
  defaultOn?: boolean,
): [ValueOff | ValueOn, UseToggleActions]

function useToggle<ValueOff, ValueOn>(
  valueOff: ValueOff = false as unknown as ValueOff,
  valueOn?: ValueOn,
  defaultOn = false,
) {
  const resolvedValueOn = (valueOn === undefined ? !valueOff : valueOn) as ValueOff | ValueOn
  const [state, setState] = useState(defaultOn ? resolvedValueOn : valueOff)

  const actions: UseToggleActions = useMemo(() => {
    const setOn = () => {
      setState(resolvedValueOn)
    }

    const setOff = () => {
      setState(valueOff)
    }

    const toggle = () => {
      setState((prevState) => (prevState === resolvedValueOn ? valueOff : resolvedValueOn))
    }

    return {
      toggle,
      setOn,
      setOff,
    }
  }, [])

  return [state, actions] as const
}

export { useToggle }
