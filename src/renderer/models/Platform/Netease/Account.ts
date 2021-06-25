import { SnapshotIn, types } from 'mobx-state-tree'

export const Account = types.model('Account', {
  id: types.number,
  userName: types.string,
  type: types.number,
  status: types.number,
  whitelistAuthority: types.number,
  createTime: types.number,
  tokenVersion: types.number,
  ban: types.number,
  baoyueVersion: types.number,
  donateVersion: types.number,
  vipType: types.number,
  anonimousUser: types.boolean,
  paidFee: types.maybe(types.boolean),
})

export type AccountSnapshotIn = SnapshotIn<typeof Account>
