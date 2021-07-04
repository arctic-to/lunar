import Store from 'electron-store'

import { SongSnapshotOut } from '@/models'

const store = new Store<{ songMap: [number, SongSnapshotOut][] }>({
  name: 'song_cache',
  defaults: { songMap: [] },
})

export const songMap = new Map<number, SongSnapshotOut>(store.get('songMap'))

export function setSongMap(songs: SongSnapshotOut[]) {
  songs.forEach((song) => {
    songMap.set(song.id, song)
  })
  store.set('songMap', [...songMap])
}

export function getCachedSongs(songIds: number[]) {
  return songIds.map((songId) => songMap.get(songId)).filter(isSongSnapshotIn)
}

export function isSongSnapshotIn(
  song: SongSnapshotOut | undefined,
): song is SongSnapshotOut {
  return Boolean(song)
}
