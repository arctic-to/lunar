import { SongSnapshotIn, useCurrentTrack } from '@/models'

export function usePlaying(song: SongSnapshotIn) {
  const currentTrack = useCurrentTrack()
  return currentTrack?.song.id === song.id
}
