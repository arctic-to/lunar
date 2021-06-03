import { useCallback, useState } from 'react'

export function useTracker() {
  const [tracker, setTracker] = useState<number>(0)
  const track = useCallback(() => {
    setTracker((t) => t + 1)
  }, [])

  return [tracker, track] as const
}
