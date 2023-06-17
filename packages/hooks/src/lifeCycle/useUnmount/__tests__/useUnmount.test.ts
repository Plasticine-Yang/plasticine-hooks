import { renderHook } from '@testing-library/react'

import { useUnmount } from '../useUnmount'

describe('useUnmount', () => {
  const setup = (callback: () => void) =>
    renderHook(() => {
      useUnmount(callback)
    })

  test('should execute callback before unmount', () => {
    const callback = jest.fn()
    const hook1 = setup(callback)

    // mount 时不执行回调
    expect(callback).not.toHaveBeenCalled()

    // rerender 时不执行回调
    hook1.rerender()
    expect(callback).not.toHaveBeenCalled()

    // unmount 时执行回调
    hook1.unmount()
    expect(callback).toHaveBeenCalledTimes(1)

    // 重新 mount 再 unmount 时执行回调
    const hook2 = setup(callback)
    hook2.unmount()
    expect(callback).toHaveBeenCalledTimes(2)
  })
})
