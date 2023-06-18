import { ApiTableRow } from './types'

export function isColumnEmpty(rows: ApiTableRow[], columnName: keyof ApiTableRow): boolean {
  const hasValue = rows.map((row) => row[columnName]).some((item) => item !== undefined)
  return !hasValue
}

export function shouldRenderColumn(rows: ApiTableRow[], columnName: keyof ApiTableRow) {
  return !isColumnEmpty(rows, columnName)
}
