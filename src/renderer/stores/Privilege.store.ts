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

        if (!isSongAvailableOfficially(song)) {
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

function isSongAvailableOfficially(song: SongSnapshotIn) {
  const privilege = songPrivilegeMap.get(String(song.id))
  return (privilege?.st ?? -1) >= 0
}

export enum SongSourceKind {
  Netease,
  Unofficial,
  None,
}

export function getSongSourceKind(song: SongSnapshotIn) {
  switch (true) {
    case isSongAvailableOfficially(song):
      return SongSourceKind.Netease
    case unofficialSongSourceMap.has(String(song.id)):
      return SongSourceKind.Unofficial
    default:
      return SongSourceKind.None
  }
}

export function isSongAvailable(song: SongSnapshotIn) {
  return getSongSourceKind(song) !== SongSourceKind.None
}

export function getUnofficialSongUrl(song: SongSnapshotIn) {
  return unofficialSongSourceMap.get(String(song.id))?.url
}
