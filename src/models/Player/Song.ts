import { SnapshotOut } from 'mobx-state-tree'

import { Track } from '../Platform/Netease'

export const Song = Track
export type SongSnapshot = SnapshotOut<typeof Song>
