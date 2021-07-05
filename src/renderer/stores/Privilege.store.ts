import match from '@revincx/unblockneteasemusic'
import Store from 'electron-store'
import { SnapshotOut, types } from 'mobx-state-tree'

import { Privilege, PrivilegeSnapshotIn } from '@/models/Player/Privilege'
import { SongSnapshotIn } from '@/models/Player/Song'

import { getMst } from './getMst'

type UnofficialSongSourceSnapshot = SnapshotOut<typeof UnofficialSongSource>
type PrivilegeMapEntry = [number, PrivilegeSnapshotIn]
type UnofficialSongSourceMapMapEntry = [number, UnofficialSongSourceSnapshot]

const store = new Store<{
  privilegeMap: PrivilegeMapEntry[]
  unofficialSongSourceMap: UnofficialSongSourceMapMapEntry[]
}>({
  name: 'privilege_cache',
  defaults: { privilegeMap: [], unofficialSongSourceMap: [] },
})

const UnofficialSongSource = types.model('UnofficialSongSource', {
  size: types.number,
  br: types.number,
  url: types.string,
})

export const PrivilegeStore = types
  .model('PrivilegeStore', {
    privilegeMap: types.map(Privilege),
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
    _setPrivilegeMap(entries: PrivilegeMapEntry[]) {
      entries.forEach(([id, privilege]) => {
        self.privilegeMap.set(String(id), privilege)
      })
    },
    _setUnofficialSongSourceMap(entries: UnofficialSongSourceMapMapEntry[]) {
      entries.forEach(([id, unofficialSongSource]) => {
        self.unofficialSongSourceMap.set(String(id), unofficialSongSource)
      })
    },
    setPrivilegeMap(
      songs: SongSnapshotIn[],
      privileges: PrivilegeSnapshotIn[],
    ) {
      const promises: Promise<UnofficialSongSourceSnapshot>[] = []
      songs.forEach((song, index) => {
        self.privilegeMap.set(String(song.id), privileges[index])

        if (!isSongAvailableOfficially(song.id)) {
          promises.push(
            match(song.id, ['qq', 'kuwo', 'migu'], {
              ...song,
              album: song.al,
              artists: song.ar,
            }).then((result: UnofficialSongSourceSnapshot) => {
              self.setunofficialSongSourceMapItem(song.id, result)
            }),
          )
        }
      })

      store.set('privilegeMap', [...privilegeMap])
      Promise.all(promises).then(() => {
        store.set('unofficialSongSourceMap', [...unofficialSongSourceMap])
      })
    },
  }))
  .actions((self) => ({
    afterCreate() {
      self._setPrivilegeMap(store.get('privilegeMap'))
      self._setUnofficialSongSourceMap(store.get('unofficialSongSourceMap'))
    },
  }))

const {
  privilegeMap,
  unofficialSongSourceMap,
  setPrivilegeMap: _setPrivilegeMap,
} = getMst(PrivilegeStore)

export const setPrivilegeMap = _setPrivilegeMap

function isSongAvailableOfficially(songId: number) {
  const privilege = privilegeMap.get(String(songId))
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
