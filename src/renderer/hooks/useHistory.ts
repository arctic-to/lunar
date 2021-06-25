import { useEffect, useState } from 'react'

export function useHistory() {
  const [history, setHistory] = useState<History | undefined>()

  useEffect(() => {
    setHistory(window.history)
  }, [])

  return history
}
