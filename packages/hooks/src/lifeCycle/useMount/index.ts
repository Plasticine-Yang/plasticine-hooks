import { useEffect } from 'react'

/**
 * 仅在组件 mount 时执行一次回调
 *
 * @param callback 仅在 mount 时执行的回调
 */
export function useMount(callback: () => void) {
  useEffect(() => {
    callback()
  }, [])
}
