import { useCallback, useState } from 'react'

type SetStateUpdateFn<State extends Record<PropertyKey, any>> = (prevState: State) => Partial<State>

type SetStateWithMergeFn<State extends Record<PropertyKey, any>> = (
  nextStateOrUpdateFn: Partial<State> | SetStateUpdateFn<State>,
) => void

/**
 * 管理 object 类型 state，用法与类组件的 `this.setState` 基本一致
 *
 * @param initialState 初始状态
 * @returns [状态, 更新状态]
 */
export function useSetState<State extends Record<PropertyKey, any>>(
  initialState: State,
): [State, SetStateWithMergeFn<State>] {
  const [state, setState] = useState<State>(initialState)

  const setStateWithMerge: SetStateWithMergeFn<State> = useCallback((nextStateOrUpdateFn) => {
    setState((prevState) => {
      const nextState = typeof nextStateOrUpdateFn === 'function' ? nextStateOrUpdateFn(prevState) : nextStateOrUpdateFn

      return {
        ...prevState,
        ...nextState,
      }
    })
  }, [])

  return [state, setStateWithMerge]
}
