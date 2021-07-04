import match from '@revincx/unblockneteasemusic'
import Store from 'electron-store'

import { PrivilegeSnapshotIn } from '@/models'
import { SongSnapshotIn } from '@/models/Player/Song'

interface UnofficialSongSource {
  size: number
  br: number
  url: string
}

const store = new Store<{ privilegeMap: [number, PrivilegeSnapshotIn][] }>({
  name: 'privilege_cache',
  defaults: { privilegeMap: [] },
})

export const privilegeMap = new Map<number, PrivilegeSnapshotIn>(
  store.get('privilegeMap'),
)
export const unofficialSongSourceMap = new Map<number, UnofficialSongSource>(
  store.get('unofficialSongSourceMap'),
)

export function setPrivilegeMap(
  songs: SongSnapshotIn[],
  privileges: PrivilegeSnapshotIn[],
) {
  const promises: Promise<UnofficialSongSource>[] = []
  songs.forEach((song, index) => {
    privilegeMap.set(song.id, privileges[index])

    if (!isSongAvailableOfficially(song.id)) {
      promises.push(
        match(song.id, ['qq', 'kuwo', 'migu'], {
          ...song,
          album: song.al,
          artists: song.ar,
        }).then((result: UnofficialSongSource) => {
          unofficialSongSourceMap.set(song.id, result)
        }),
      )
    }
  })

  store.set('privilegeMap', [...privilegeMap])
  Promise.all(promises).then(() => {
    store.set('unofficialSongSourceMap', [...unofficialSongSourceMap])
  })
}

function isSongAvailableOfficially(songId: number) {
  const privilege = privilegeMap.get(songId)
  // https://github.com/Binaryify/NeteaseCloudMusicApi/issues/718#issuecomment-610137558
  return (privilege?.st ?? -1) >= 0
}

export enum SongSourceKind {
  Netease,
  Unofficial,
  None,
}

export function getSongSourceKind(songId: number) {
  switch (true) {
    case isSongAvailableOfficially(songId):
      return SongSourceKind.Netease
    case unofficialSongSourceMap.has(songId):
      return SongSourceKind.Unofficial
    default:
      return SongSourceKind.None
  }
}

export function isSongAvailable(songId: number) {
  return getSongSourceKind(songId) !== SongSourceKind.None
}

export function getUnofficialSongUrl(songId: number) {
  return unofficialSongSourceMap.get(songId)?.url
}
