import { SnapshotIn, SnapshotOut } from 'mobx-state-tree'

import { Album as NeteaseAlbum } from '../Platform/Netease'

export const Album = NeteaseAlbum
export type AlbumSnapshotIn = SnapshotIn<typeof Album>
export type AlbumSnapshotOut = SnapshotOut<typeof Album>
