import { SnapshotIn, SnapshotOut } from 'mobx-state-tree'

import { Privilege as NeteasePrivilege } from '../Platform/Netease'

export const Privilege = NeteasePrivilege
export type PrivilegeSnapshotIn = SnapshotIn<typeof Privilege>
export type PrivilegeSnapshotOut = SnapshotOut<typeof Privilege>
