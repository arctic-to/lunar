import { range } from 'lodash'
import { useState, useCallback } from 'react'

export function useSonglist() {
  const [activeSongIndexes, setActiveSongIndexes] = useState<number[]>([])

  const resetActiveSongIndexes = useCallback(
    (index: number) => (e: React.MouseEvent) => {
      switch (true) {
        case e.shiftKey: {
          const [lastActiveSongIndex = 0] = activeSongIndexes.slice(-1)
          setActiveSongIndexes([...range(lastActiveSongIndex, index), index])
          break
        }
        case e.ctrlKey: {
          setActiveSongIndexes([...activeSongIndexes, index])
          break
        }
        default: {
          setActiveSongIndexes([index])
        }
      }
    },
    [activeSongIndexes],
  )

  return {
    activeSongIndexes,
    resetActiveSongIndexes,
  }
}
