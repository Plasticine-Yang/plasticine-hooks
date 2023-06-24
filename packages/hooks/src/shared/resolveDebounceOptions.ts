import type { DebounceSettings } from 'lodash'

const DEFAULT_WAIT = 1000
const DEFAULT_LEADING = false
const DEFAULT_TRAILING = true

export type DebounceOptions = DebounceSettings & {
  /**
   * 防抖的时间间隔
   *
   * @default 1000
   */
  wait?: number
}

export function resolveDebounceOptions(options?: DebounceOptions): DebounceOptions {
  return {
    wait: options?.wait ?? DEFAULT_WAIT,
    leading: options?.leading ?? DEFAULT_LEADING,
    trailing: options?.trailing ?? DEFAULT_TRAILING,
    ...(options?.maxWait !== undefined ? { maxWait: options.maxWait } : null),
  }
}
