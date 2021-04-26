import { SnapshotIn, SnapshotOut } from 'mobx-state-tree'

import { PlaylistDetail as NeteasePlaylistDetail } from '../Platform/Netease'

export const PlaylistDetail = NeteasePlaylistDetail
export type PlaylistDetailSnapshotIn = SnapshotIn<typeof PlaylistDetail>
export type PlaylistDetailSnapshotOut = SnapshotOut<typeof PlaylistDetail>
