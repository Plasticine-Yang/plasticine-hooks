import type { ApiTableRow } from '@/components'

export const apiParamsMeta: ApiTableRow[] = [
  {
    name: 'callback',
    type: '() => void',
    description: '组件 mount 后会执行的回调',
  },
]
