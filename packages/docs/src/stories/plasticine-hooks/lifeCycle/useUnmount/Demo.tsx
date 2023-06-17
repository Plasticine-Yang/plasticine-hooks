import { Box, Button } from '@mui/material'
import { FC } from 'react'

import { useBoolean, useUnmount } from 'plasticine-hooks'

const Foo: FC = () => {
  useUnmount(() => {
    window.alert('unmount')
  })

  return <Box>Foo</Box>
}

const Demo: FC = () => {
  const [mounted, { toggle }] = useBoolean(false)

  return (
    <Box>
      <Button variant="contained" onClick={toggle}>
        {mounted ? 'unmount' : 'mount'}
      </Button>

      {mounted && <Foo />}
    </Box>
  )
}

export default Demo
