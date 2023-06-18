import { Chip } from '@mui/material'
import { memo, useMemo, type FC } from 'react'

const DEFAULT_CONTENT = '--'

interface RowTagProps {
  content?: string
}

const RowTag: FC<RowTagProps> = memo((props) => {
  const { content } = props

  const label = useMemo(() => content || DEFAULT_CONTENT, [content])

  return <Chip label={label} variant="outlined" color="primary" size="small" />
})

export default RowTag
