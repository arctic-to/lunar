import { SnapshotIn, SnapshotOut } from 'mobx-state-tree'

import { HotSong as NeteaseHotSong } from '../Platform/Netease'

export const HotSong = NeteaseHotSong
export type HotSongSnapshotIn = SnapshotIn<typeof HotSong>
export type HotSongSnapshotOut = SnapshotOut<typeof HotSong>
