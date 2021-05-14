import { SnapshotIn, SnapshotOut } from 'mobx-state-tree'

import { SongResult as NeteaseSongResult } from '../../Platform/Netease'

export const SongResult = NeteaseSongResult
export type SongResultSnapshotIn = SnapshotIn<typeof SongResult>
export type SongResultSnapshotOut = SnapshotOut<typeof SongResult>
