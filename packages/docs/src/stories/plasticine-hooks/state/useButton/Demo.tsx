import { Box, Button, Stack } from '@mui/material'
import { FC, useCallback } from 'react'

import { useBoolean } from 'plasticine-hooks'

const Demo: FC = () => {
  const [state, { toggle, setTrue, setFalse, set }] = useBoolean()

  const handleSet = useCallback(() => {
    set(true)
  }, [set])

  return (
    <Box>
      <p>state: {JSON.stringify(state)}</p>

      <Stack direction="row" spacing={4}>
        <Button variant="contained" onClick={toggle}>
          toggle
        </Button>

        <Button variant="contained" onClick={setTrue}>
          set true
        </Button>

        <Button variant="contained" onClick={setFalse}>
          set false
        </Button>

        <Button variant="contained" onClick={handleSet}>
          set
        </Button>
      </Stack>
    </Box>
  )
}

export default Demo
