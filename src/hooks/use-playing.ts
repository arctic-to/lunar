import { SongSnapshot, useCurrentTrack } from '@/models'

export function usePlaying(song: SongSnapshot) {
  const currentTrack = useCurrentTrack()
  return currentTrack?.song.id === song.id
}
