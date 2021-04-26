import { SnapshotIn, SnapshotOut } from 'mobx-state-tree'

import { Playlist as NeteasePlaylist } from '../Platform/Netease'

export const Playlist = NeteasePlaylist
export type PlaylistSnapshotIn = SnapshotIn<typeof Playlist>
export type PlaylistSnapshotOut = SnapshotOut<typeof Playlist>
