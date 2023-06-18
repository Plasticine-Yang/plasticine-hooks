import type { ApiTableRow } from '@/components'

export const apiParamsMeta: ApiTableRow[] = [
  {
    name: 'defaultValue',
    type: 'boolean',
    description: '布尔状态的默认值',
    defaultValue: 'false',
  },
]

export const apiResultMeta: ApiTableRow[] = [
  {
    name: 'state',
    type: 'boolean',
    description: '布尔状态值',
  },
  {
    name: 'actions',
    type: 'UseBooleanActions',
    description: '对布尔状态可进行的所有操作',
  },
]

export const apiUseBooleanActionsMeta: ApiTableRow[] = [
  {
    name: 'toggle',
    type: '() => void',
    description: '在 true 和 false 之间切换',
  },
  {
    name: 'setTrue',
    type: '() => void',
    description: '将状态值设为 true',
  },
  {
    name: 'setFalse',
    type: '() => void',
    description: '将状态值设为 false',
  },
  {
    name: 'set',
    type: '(value: boolean) => void',
    description: '设置状态值',
  },
]
