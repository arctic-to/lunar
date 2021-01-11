import { SnapshotIn, types } from 'mobx-state-tree'

import { Account } from './Account'
import { Profile } from './Profile'

export const Netease = types.model('Netease', {
  account: Account,
  profile: Profile,
})

export type NeteaseSnapshot = SnapshotIn<typeof Netease>
