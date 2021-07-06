import Store from 'electron-store'
import { types } from 'mobx-state-tree'

import {
  matchUnofficialSong,
  UnofficialSongSource,
  UnofficialSongSourceSnapshot,
} from '@/data/unofficial'
import { Privilege, PrivilegeSnapshotIn } from '@/models/Player/Privilege'
import { SongSnapshotIn } from '@/models/Player/Song'

import { getMst } from './getMst'

type PrivilegeMapEntry = [number, PrivilegeSnapshotIn]
type UnofficialSongSourceMapMapEntry = [number, UnofficialSongSourceSnapshot]

const store = new Store<{
  privilegeMap: PrivilegeMapEntry[]
  unofficialSongSourceMap: UnofficialSongSourceMapMapEntry[]
}>({
  name: 'privilege_cache',
  defaults: { privilegeMap: [], unofficialSongSourceMap: [] },
})

export const PrivilegeStore = types
  .model('PrivilegeStore', {
    privilegeMap: types.map(Privilege),
    unofficialSongSourceMap: types.map(UnofficialSongSource),
  })
  .actions((self) => ({
    setUnofficialSongSourceMapItem(
      songId: number,
      source: UnofficialSongSourceSnapshot,
    ) {
      self.unofficialSongSourceMap.set(String(songId), source)
    },
    deleteUnofficialSongSourceMapItem(songId: number) {
      self.unofficialSongSourceMap.delete(String(songId))
      store.set('unofficialSongSourceMap', [...self.unofficialSongSourceMap])
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
      const promises: Promise<void>[] = []
      songs.forEach((song, index) => {
        const privilege = privileges[index]
        self.privilegeMap.set(String(song.id), privilege)

        if (
          !_isSongAvailableOfficially(privilege) &&
          !self.unofficialSongSourceMap.has(String(song.id))
        ) {
          promises.push(
            matchUnofficialSong(song).then((source) => {
              if (source) {
                self.setUnofficialSongSourceMapItem(song.id, source)
              }
            }),
          )
        }
      })

      store.set('privilegeMap', [...self.privilegeMap])
      Promise.allSettled(promises).then(() => {
        store.set('unofficialSongSourceMap', [...self.unofficialSongSourceMap])
      })
    },
  }))
  .actions((self) => ({
    afterCreate() {
      self._setPrivilegeMap(store.get('privilegeMap'))
      self._setUnofficialSongSourceMap(store.get('unofficialSongSourceMap'))
    },
  }))

const privilegeStore = getMst(PrivilegeStore)
const { privilegeMap, unofficialSongSourceMap } = privilegeStore

export const setPrivilegeMap = privilegeStore.setPrivilegeMap
export const deleteUnofficialSongSourceMapItem =
  privilegeStore.deleteUnofficialSongSourceMapItem

function _isSongAvailableOfficially(
  privilege: PrivilegeSnapshotIn | undefined,
) {
  // https://github.com/Binaryify/NeteaseCloudMusicApi/issues/718#issuecomment-610137558
  return privilege ? privilege.st >= 0 : false
}

function isSongAvailableOfficially(songId: number) {
  const privilege = privilegeMap.get(String(songId))
  return _isSongAvailableOfficially(privilege)
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
