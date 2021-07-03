import { SongSnapshotIn } from '@/models'

export const songMap = new Map<number, SongSnapshotIn>()

export function setSongMap(songs: SongSnapshotIn[]) {
  songs.forEach((song) => {
    songMap.set(song.id, song)
  })
}

export function isSongSnapshotIn(
  song: SongSnapshotIn | undefined,
): song is SongSnapshotIn {
  return Boolean(song)
}
