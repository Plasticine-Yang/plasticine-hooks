import { Button, Divider, Input, Stack } from '@mui/material'
import { FC } from 'react'

import { useSetState } from 'plasticine-hooks'

interface DemoState {
  foo: string
  count: number
}

const Demo: FC = () => {
  const [state, setState] = useSetState<DemoState>({ foo: 'hello', count: 0 })

  return (
    <Stack direction="column" spacing={4}>
      <Stack direction="column" spacing={2}>
        <p>foo: {state.foo}</p>

        <Input value={state.foo} onChange={(e) => setState({ foo: e.target.value })} />
      </Stack>

      <Divider />

      <Stack direction="column" spacing={2}>
        <p>count: {state.count}</p>

        <Button variant="contained" onClick={() => setState((prevState) => ({ count: prevState.count + 1 }))}>
          add
        </Button>
      </Stack>
    </Stack>
  )
}

export default Demo
