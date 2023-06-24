import type { ThrottleSettings } from 'lodash'

const DEFAULT_WAIT = 1000
const DEFAULT_LEADING = false
const DEFAULT_TRAILING = true

export type ThrottleOptions = ThrottleSettings & {
  /**
   * 防抖的时间间隔
   *
   * @default 1000
   */
  wait?: number
}

export function resolveThrottleOptions(options?: ThrottleOptions): ThrottleOptions {
  return {
    wait: options?.wait ?? DEFAULT_WAIT,
    leading: options?.leading ?? DEFAULT_LEADING,
    trailing: options?.trailing ?? DEFAULT_TRAILING,
  }
}
