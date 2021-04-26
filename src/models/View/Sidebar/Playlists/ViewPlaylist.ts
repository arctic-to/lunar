import { Instance, SnapshotOut, types } from 'mobx-state-tree'

import { Playlist } from '@/models/Player'

import { ViewState } from './ViewState'

export const ViewPlaylist = types.compose(
  'ViewPlaylist',
  Playlist,
  types.model({
    viewState: types.reference(ViewState),
  }),
)

export type ViewPlaylistSnapshotOut = SnapshotOut<typeof ViewPlaylist>
export type ViewPlaylistInstance = Instance<typeof ViewPlaylist>
