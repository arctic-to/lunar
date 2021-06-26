import { types } from 'mobx-state-tree'

import { Privilege, PrivilegeSnapshotIn } from '@/models/Player/Privilege'
import { SongSnapshotIn } from '@/models/Player/Song'

import { getMst } from './getMst'

export const PrivilegeStore = types
  .model('PrivilegeStore', {
    songPrivilegeMap: types.map(Privilege),
  })
  .actions((self) => ({
    setSongPrivilegeMap(
      songs: SongSnapshotIn[],
      privilges: PrivilegeSnapshotIn[],
    ) {
      songs.forEach(({ id }, index) => {
        self.songPrivilegeMap.set(String(id), privilges[index])
      })
    },
  }))

const privilegeStore = getMst(PrivilegeStore)

export function isSongAvailable(song: SongSnapshotIn) {
  const privilege = privilegeStore.songPrivilegeMap.get(String(song.id))
  return (privilege?.st ?? -1) >= 0
}
