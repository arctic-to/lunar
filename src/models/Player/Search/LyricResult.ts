import { SnapshotIn, SnapshotOut } from 'mobx-state-tree'

import { LyricResult as NeteaseLyricResult } from '../../Platform/Netease'

export const LyricResult = NeteaseLyricResult
export type LyricResultSnapshotIn = SnapshotIn<typeof LyricResult>
export type LyricResultSnapshotOut = SnapshotOut<typeof LyricResult>
