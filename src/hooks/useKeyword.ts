import { useState, useCallback } from 'react'

export function useKeyword() {
  const [keyword, setKeyword] = useState('')
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.currentTarget.value)
    },
    [],
  )
  const clear = useCallback(() => {
    setKeyword('')
  }, [])

  return [keyword, handleInputChange, clear] as const
}
