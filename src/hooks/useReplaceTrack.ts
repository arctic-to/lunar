import { SongSnapshot, usePlayer } from '@/models'
import { PrivilegeSnapshot } from '@/models/Platform/Netease'

import { usePlaying } from './usePlaying'

export function useReplaceTrack({
  song,
  privilege,
}: {
  song: SongSnapshot
  privilege?: PrivilegeSnapshot
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
