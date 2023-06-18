import { Chip } from '@mui/material'
import { memo, useMemo, type FC, PropsWithChildren } from 'react'

const DEFAULT_CONTENT = '--'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RowTagProps {}

const RowTag: FC<PropsWithChildren<RowTagProps>> = memo((props) => {
  const { children } = props

  const label = useMemo(() => children || DEFAULT_CONTENT, [children])

  return <Chip label={label} variant="outlined" color="primary" size="small" />
})

export default RowTag
