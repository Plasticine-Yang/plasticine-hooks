import type { ApiTableRow } from '@/components'

export const apiResultMeta: ApiTableRow[] = [
  {
    name: 'unmountedRef',
    type: 'React.MutableRefObject<boolean>',
    defaultValue: 'false',
    description: '记录组件是否已经 unmount',
  },
]
