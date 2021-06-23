import { useCallback } from 'react'

import { usePlayer, OrderEnum } from '@/models'

import { useShufflePlay } from './useShufflePlay'

export function usePlayNext() {
  const { order, playNextSibling } = usePlayer()
  const shufflePlay = useShufflePlay()

  return useCallback(() => {
    switch (order) {
      case OrderEnum.RepeatOne:
      case OrderEnum.Repeat: {
        playNextSibling()
        break
      }
      case OrderEnum.Shuffle: {
        shufflePlay()
      }
    }
  }, [order, playNextSibling, shufflePlay])
}
