import { cast, SnapshotOut, types } from 'mobx-state-tree'

import { Account, AccountSnapshotIn } from './Account'
import { Likelist, LikelistSnapshotOut } from './Likelist'
import { Profile, ProfileSnapshotIn } from './Profile'

export const Netease = types
  .model('Netease', {
    account: types.maybeNull(Account),
    profile: types.maybeNull(Profile),
    likelist: types.maybeNull(Likelist),
  })
  .actions((self) => ({
    setAccount(account: AccountSnapshotIn | null) {
      self.account = cast(account)
    },
    setProfile(profile: ProfileSnapshotIn | null) {
      self.profile = cast(profile)
    },
    setLikelist(likelist: LikelistSnapshotOut) {
      self.likelist = cast(likelist)
    },
  }))

export const netease = Netease.create()
export type NeteaseSnapshot = SnapshotOut<typeof Netease>
