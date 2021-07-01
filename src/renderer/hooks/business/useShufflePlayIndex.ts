import { useMemo } from 'react'

import { usePlayer } from '@/models'

export function useShufflePlayIndex() {
  const { queue, track } = usePlayer()

  return useMemo(
    () => Math.floor(Math.random() * queue.size),
    // recalculate index when the curr track is changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [track.song, queue.size],
  )
}
