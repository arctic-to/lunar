import { SnapshotIn, SnapshotOut } from 'mobx-state-tree'

import { Track } from '../Platform/Netease'

export const Song = Track
export type SongSnapshotIn = SnapshotIn<typeof Song>
export type SongSnapshotOut = SnapshotOut<typeof Song>
