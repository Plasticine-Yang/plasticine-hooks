import { useState } from 'react'
import { act, renderHook } from '@testing-library/react'

describe('hello', () => {
  test('happy path', () => {
    const { result } = renderHook(() => {
      const [message, setMessage] = useState('hello')

      return {
        message,
        setMessage,
      }
    })

    expect(result.current.message).toBe('hello')

    act(() => {
      result.current.setMessage('hi')
    })

    expect(result.current.message).toBe('hi')
  })
})
