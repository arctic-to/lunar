import { SnapshotIn } from 'mobx-state-tree'

import { Playlist as NeteasePlaylist } from '../Platform/Netease'

export const Playlist = NeteasePlaylist
export type PlaylistSnapshot = SnapshotIn<typeof Playlist>
