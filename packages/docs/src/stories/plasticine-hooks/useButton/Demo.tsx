import { FC, useCallback } from 'react'

import { useBoolean } from 'plasticine-hooks'

const Demo: FC = () => {
  const [state, { toggle, setTrue, setFalse, set }] = useBoolean()

  const handleSet = useCallback(() => {
    set(true)
  }, [])

  return (
    <div>
      <p>state: {JSON.stringify(state)}</p>
      <button onClick={toggle}>toggle</button>
      <button onClick={setTrue}>setTrue</button>
      <button onClick={setFalse}>setFalse</button>
      <button onClick={handleSet}>set</button>
    </div>
  )
}

export default Demo
