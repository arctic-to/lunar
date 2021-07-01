import { usePlayer, OrderEnum } from '@/models'

import { useShufflePlayIndex } from './useShufflePlayIndex'

export function useNextSongIndex() {
  const { order, currSongIndex } = usePlayer()
  const shufflePlayIndex = useShufflePlayIndex()

  switch (order) {
    case OrderEnum.RepeatOne:
    case OrderEnum.Repeat: {
      return currSongIndex + 1
    }
    case OrderEnum.Shuffle: {
      return shufflePlayIndex
    }
  }
}
