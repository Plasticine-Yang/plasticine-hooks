import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { memo, useCallback, useMemo, type FC } from 'react'

import RowTag from './RowTag'
import { shouldRenderColumn } from './helpers'
import type { ApiTableProps, ApiTableRow } from './types'

const tableRowKeys: (keyof ApiTableRow)[] = ['name', 'description', 'type', 'defaultValue']
const tableHeadMap: Record<keyof ApiTableRow, string> = {
  name: '参数名',
  type: '类型',
  description: '描述',
  defaultValue: '默认值',
}

export const ApiTable: FC<ApiTableProps> = memo((props) => {
  const { rows } = props

  const renderTableHeadRow = useMemo(() => {
    return tableRowKeys
      .filter((key) => shouldRenderColumn(rows, key))
      .map((key) => {
        return <TableCell>{tableHeadMap[key]}</TableCell>
      })
  }, [rows])

  const renderTableBodyRow = useCallback(
    (row: ApiTableRow) => {
      return tableRowKeys
        .filter((key) => shouldRenderColumn(rows, key))
        .map((key) => {
          const content = key === 'type' ? <code>{row[key]}</code> : row[key]

          return (
            <TableCell>
              <RowTag>{content}</RowTag>
            </TableCell>
          )
        })
    },
    [rows],
  )

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>{renderTableHeadRow}</TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow>{renderTableBodyRow(row)}</TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})

export type { ApiTableProps, ApiTableRow } from './types'
