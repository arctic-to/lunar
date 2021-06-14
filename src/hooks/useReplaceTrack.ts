import { SongSnapshotIn, usePlayer } from '@/models'
import { PrivilegeSnapshotIn } from '@/models'

import { usePlaying } from './usePlaying'

export function useReplaceTrack({
  song,
  privilege,
}: {
  song: SongSnapshotIn
  privilege?: PrivilegeSnapshotIn | undefined
}) {
  const player = usePlayer()
  const playing = usePlaying(song)
  const unavailable = !(privilege?.cp ?? true)

  return () => {
    if (playing) return
    if (unavailable) return

    player.replaceTrack({
      song,
      playing: true,
    })
  }
}
