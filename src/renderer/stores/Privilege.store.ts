import match from '@revincx/unblockneteasemusic'
import { SnapshotOut, types } from 'mobx-state-tree'

import { Privilege, PrivilegeSnapshotIn } from '@/models/Player/Privilege'
import { SongSnapshotIn } from '@/models/Player/Song'

import { getMst } from './getMst'

type UnofficialSongSourceSnapshot = SnapshotOut<typeof UnofficialSongSource>
const UnofficialSongSource = types.model('UnofficialSongSource', {
  size: types.number,
  br: types.number,
  url: types.string,
})

export const PrivilegeStore = types
  .model('PrivilegeStore', {
    songPrivilegeMap: types.map(Privilege),
    unofficialSongSourceMap: types.map(UnofficialSongSource),
  })
  .actions((self) => ({
    setunofficialSongSourceMapItem(
      songId: number,
      source: UnofficialSongSourceSnapshot,
    ) {
      self.unofficialSongSourceMap.set(String(songId), source)
    },
  }))
  .actions((self) => ({
    setSongPrivilegeMap(
      songs: SongSnapshotIn[],
      privilges: PrivilegeSnapshotIn[],
    ) {
      songs.forEach((song, index) => {
        if (self.songPrivilegeMap.has(String(song.id))) return

        self.songPrivilegeMap.set(String(song.id), privilges[index])

        if (!isSongAvailableOfficially(song.id)) {
          match(song.id, ['qq', 'kuwo', 'migu'], {
            ...song,
            album: song.al,
            artists: song.ar,
          }).then((result: UnofficialSongSourceSnapshot) => {
            self.setunofficialSongSourceMapItem(song.id, result)
          })
        }
      })
    },
  }))

const { songPrivilegeMap, unofficialSongSourceMap } = getMst(PrivilegeStore)

function isSongAvailableOfficially(songId: number) {
  const privilege = songPrivilegeMap.get(String(songId))
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
    case unofficialSongSourceMap.has(String(songId)):
      return SongSourceKind.Unofficial
    default:
      return SongSourceKind.None
  }
}

export function isSongAvailable(songId: number) {
  return getSongSourceKind(songId) !== SongSourceKind.None
}

export function getUnofficialSongUrl(songId: number) {
  return unofficialSongSourceMap.get(String(songId))?.url
}
