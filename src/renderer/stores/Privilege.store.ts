import match from '@revincx/unblockneteasemusic'
import { SnapshotOut, types } from 'mobx-state-tree'

import { Privilege, PrivilegeSnapshotIn } from '@/models/Player/Privilege'
import { SongSnapshotIn } from '@/models/Player/Song'

import { getMst } from './getMst'

function isSongAvailableOfficially(privilege?: PrivilegeSnapshotIn) {
  return (privilege?.st ?? -1) >= 0
}

type UnofficialSongSourceSnapshot = SnapshotOut<typeof UnofficialSongSource>
const UnofficialSongSource = types.model({
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

        const privilege = privilges[index]
        self.songPrivilegeMap.set(String(song.id), privilege)

        if (!isSongAvailableOfficially(privilege)) {
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

export function isSongAvailable(song: SongSnapshotIn) {
  const privilege = songPrivilegeMap.get(String(song.id))
  const unofficialSongUrl = unofficialSongSourceMap.get(String(song.id))
  return isSongAvailableOfficially(privilege) || unofficialSongUrl
}

export function getUnofficialSongUrl(song: SongSnapshotIn) {
  return unofficialSongSourceMap.get(String(song.id))?.url
}
