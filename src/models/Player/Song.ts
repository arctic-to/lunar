import { SnapshotIn } from 'mobx-state-tree'

import { Track } from '../Platform/Netease'

export const Song = Track
export type SongSnapshot = SnapshotIn<typeof Song>
