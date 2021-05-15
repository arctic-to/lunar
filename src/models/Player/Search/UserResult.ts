import { SnapshotIn, SnapshotOut } from 'mobx-state-tree'

import { UserResult as NeteaseUserResult } from '../../Platform/Netease'

export const UserResult = NeteaseUserResult
export type UserResultSnapshotIn = SnapshotIn<typeof UserResult>
export type UserResultSnapshotOut = SnapshotOut<typeof UserResult>
