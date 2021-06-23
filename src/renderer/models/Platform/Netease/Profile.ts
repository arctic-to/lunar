import { SnapshotIn, types } from 'mobx-state-tree'

export const Profile = types.model('Profile', {
  accountStatus: types.number,
  accountType: types.maybe(types.number),
  anchor: types.maybe(types.boolean),
  authenticated: types.maybe(types.boolean),
  authenticationTypes: types.maybe(types.number),
  authority: types.number,
  authStatus: types.number,
  avatarDetail: types.maybeNull(
    types.model({
      userType: types.number,
      identityLevel: types.number,
      identityIconUrl: types.string,
    }),
  ),
  avatarImgId: types.number,
  avatarUrl: types.string,
  backgroundImgId: types.number,
  backgroundUrl: types.string,
  birthday: types.number,
  city: types.number,
  createTime: types.maybe(types.number),
  defaultAvatar: types.boolean,
  description: types.maybeNull(types.string),
  detailDescription: types.maybeNull(types.string),
  djStatus: types.number,
  experts: types.maybeNull(types.model({})),
  expertTags: types.null,
  followed: types.boolean,
  gender: types.number,
  lastLoginIP: types.maybe(types.string),
  lastLoginTime: types.maybe(types.number),
  locationStatus: types.maybe(types.number),
  mutual: types.boolean,
  nickname: types.string,
  province: types.number,
  remarkName: types.null,
  shortUserName: types.maybe(types.string),
  signature: types.string,
  userId: types.number,
  userName: types.maybe(types.string),
  userType: types.number,
  vipType: types.number,
  viptypeVersion: types.maybe(types.number),
})

export type ProfileSnapshotIn = SnapshotIn<typeof Profile>