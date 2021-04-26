import { cast, SnapshotIn, types } from 'mobx-state-tree'

import {
  PlaylistDetail,
  PlaylistDetailSnapshotOut,
  Privilege,
  PrivilegeSnapshotOut,
} from '@/models/Player'

export const ViewState = types
  .model('ViewState', {
    id: types.identifier,
    folded: true,
    playlistDetail: types.maybe(PlaylistDetail),
    privileges: types.array(Privilege),
  })
  .actions((self) => ({
    toggle() {
      self.folded = !self.folded
    },
    setPlaylistDetail(playlistDetail: PlaylistDetailSnapshotOut) {
      self.playlistDetail = cast(playlistDetail)
    },
    setPrivileges(privileges: PrivilegeSnapshotOut[]) {
      self.privileges = cast(privileges)
    },
  }))

export type ViewStateSnapshotIn = SnapshotIn<typeof ViewState>
