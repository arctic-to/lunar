import { useMemo } from 'react'

import { usePlayer } from '@/models'

export function useShufflePlayIndex() {
  const { queue, track, currSongIndex } = usePlayer()

  return useMemo(
    () => {
      // avoid playing repeated song continuously
      const _index = Math.floor(Math.random() * (queue.size - 1))
      return _index < currSongIndex ? _index : _index + 1
    },
    // recalculate index when the curr track is changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [track.song, queue.size],
  )
}
