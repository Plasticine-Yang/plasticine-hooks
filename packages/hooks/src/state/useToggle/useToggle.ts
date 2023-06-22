import { useMemo, useState } from 'react'

interface UseToggleActions {
  toggle: () => void
  setOn: () => void
  setOff: () => void
}

function useToggle(): [boolean, UseToggleActions]

function useToggle<ValueOff>(valueOff: ValueOff): [ValueOff, UseToggleActions]

function useToggle<ValueOff, ValueOn>(valueOff: ValueOff, valueOn?: ValueOn): [ValueOff | ValueOn, UseToggleActions]

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
