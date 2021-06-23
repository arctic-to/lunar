import { useCallback } from 'react'

import { usePlayer, queue } from '@/models'

export function useShufflePlay() {
  const { playNth } = usePlayer()

  return useCallback(() => {
    playNth(Math.floor(Math.random() * queue.size))
  }, [playNth])
}
