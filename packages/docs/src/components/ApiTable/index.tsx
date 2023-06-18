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
                  <RowTag content={row.name} />
                </TableCell>

                <TableCell>
                  <RowTag content={row.description} />
                </TableCell>

                <TableCell>
                  <RowTag content={row.type} />
                </TableCell>

                <TableCell>
                  <RowTag content={row.defaultValue} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
})
