import type { ApiTableRow } from '@/components'

export const apiParamsMeta: ApiTableRow[] = [
  {
    name: 'initialState',
    type: 'Record<PropertyKey, any>',
    description: '初始状态',
  },
]

export const apiResultMeta: ApiTableRow[] = [
  {
    name: 'state',
    type: 'Record<PropertyKey, any>',
    description: '状态',
  },
  {
    name: 'setState',
    type: 'SetStateWithMergeFn',
    description: '更新状态，可以传入部分或全部属性，也可以以函数的方式进行更新，函数的返回值作为下一个状态',
  },
]
