import { Box, Button } from '@mui/material'
import { FC, useEffect } from 'react'

import { useBoolean, useUnmountedRef } from 'plasticine-hooks'

const Foo: FC = () => {
  const unmountedRef = useUnmountedRef()

  useEffect(() => {
    setTimeout(() => {
      if (!unmountedRef.current) {
        alert('not unmounted~')
      }
    }, 3000)
  }, [unmountedRef])

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
