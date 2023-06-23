import { renderHook } from '@testing-library/react'

import { useMount } from '..'

const setup = (callback: () => void) =>
  renderHook(() => {
    useMount(callback)
  })

describe('useMount', () => {
  test('should execute callback only once on mount', () => {
    const callback = jest.fn()

    const hook = setup(callback)

    // mount 时执行一次
    expect(callback).toBeCalledTimes(1)

    // rerender 时不执行
    hook.rerender()
    expect(callback).toBeCalledTimes(1)

    // unmount 时不执行
    hook.unmount()
    expect(callback).toBeCalledTimes(1)

    // 重新 mount 时又执行
    setup(callback)
    expect(callback).toBeCalledTimes(2)
  })
})
