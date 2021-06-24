import { usePlayer, OrderEnum } from '@/models'

import { useShufflePlayIndex } from './useShufflePlayIndex'

export function useNextTrackIndex() {
  const { order, currTrackIndex } = usePlayer()
  const shufflePlayIndex = useShufflePlayIndex()

  switch (order) {
    case OrderEnum.RepeatOne:
    case OrderEnum.Repeat: {
      return currTrackIndex + 1
    }
    case OrderEnum.Shuffle: {
      return shufflePlayIndex
    }
  }
}
