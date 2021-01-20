import { SnapshotOut, types } from 'mobx-state-tree'

import { Account } from './Account'
import { Profile } from './Profile'

export const Netease = types.model('Netease', {
  account: types.maybeNull(Account),
  profile: types.maybeNull(Profile),
})

export type NeteaseSnapshot = SnapshotOut<typeof Netease>
