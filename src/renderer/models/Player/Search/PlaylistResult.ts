import { SnapshotIn, SnapshotOut } from 'mobx-state-tree'

import { PlaylistResult as NeteasePlaylistResult } from '../../Platform/Netease'

export const PlaylistResult = NeteasePlaylistResult
export type PlaylistResultSnapshotIn = SnapshotIn<typeof PlaylistResult>
export type PlaylistResultSnapshotOut = SnapshotOut<typeof PlaylistResult>
