import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { memo, type FC } from 'react'
import RowTag from './RowTag'

export interface ApiTableRow {
  name: string
  type: string
  description?: string
  defaultValue?: string
}

export interface ApiTableProps {
  rows: ApiTableRow[]
}

export const ApiTable: FC<ApiTableProps> = memo((props) => {
  const { rows } = props

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>参数名</TableCell>
            <TableCell>描述</TableCell>
            <TableCell>类型</TableCell>
            <TableCell>默认值</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => {
            return (
              <TableRow>
                <TableCell>
                  <RowTag>{row.name}</RowTag>
                </TableCell>

                <TableCell>
                  <RowTag>{row.description}</RowTag>
                </TableCell>

                <TableCell>
                  <RowTag>
                    <code>{row.type}</code>
                  </RowTag>
                </TableCell>

                <TableCell>
                  <RowTag>{row.defaultValue}</RowTag>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
})
