export interface ApiTableRow {
  name: string
  type: string
  description?: string
  defaultValue?: string
}

export interface ApiTableProps {
  rows: ApiTableRow[]
}
