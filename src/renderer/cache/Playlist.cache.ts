import Store from 'electron-store'

import { PlaylistDetailSnapshotOut } from '@/models'

const store = new Store<{ playlistMap: [number, PlaylistDetailSnapshotOut][] }>(
  {
    name: 'playlist_cache',
    defaults: { playlistMap: [] },
  },
)

export const playlistMap = new Map<number, PlaylistDetailSnapshotOut>(
  store.get('playlistMap'),
)

export function setPlaylistMap(_playlist: PlaylistDetailSnapshotOut) {
  const playlist = { ..._playlist, tracks: [] }
  playlistMap.set(playlist.id, playlist)
  store.set('playlistMap', [...playlistMap])
}

export function isPlaylistDetailSnapshotOut(
  playlist: PlaylistDetailSnapshotOut | undefined,
): playlist is PlaylistDetailSnapshotOut {
  return Boolean(playlist)
}
