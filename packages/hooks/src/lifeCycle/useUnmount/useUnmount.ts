import { useEffect, useRef } from 'react'

/**
 * 在组件 unmount 之前执行回调
 *
 * @param callback 组件 unmount 之前会执行的回调
 */
export function useUnmount(callback: () => void) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    return () => {
      callbackRef.current()
    }
  }, [])
}
