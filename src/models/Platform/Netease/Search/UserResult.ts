import { types } from 'mobx-state-tree'

export const UserResult = types.model('UserResult', {
  defaultAvatar: types.boolean,
  province: types.number,
  authStatus: types.number,
  followed: types.boolean,
  avatarUrl: types.string,
  accountStatus: types.number,
  gender: types.number,
  city: types.number,
  birthday: types.number,
  userId: types.number,
  userType: types.number,
  nickname: types.string,
  signature: types.string,
  description: types.string,
  detailDescription: types.string,
  avatarImgId: types.number,
  backgroundImgId: types.number,
  backgroundUrl: types.string,
  authority: types.number,
  mutual: types.boolean,
  expertTags: types.null,
  experts: types.null,
  djStatus: types.number,
  vipType: types.number,
  remarkName: types.null,
  authenticationTypes: types.number,
  avatarDetail: types.null,
  anchor: types.boolean,
  avatarImgIdStr: types.string,
  backgroundImgIdStr: types.string,
  avatarImgId_str: types.string,
  followeds: types.number,
  follows: types.number,
  alg: types.string,
  playlistCount: types.number,
  playlistBeSubscribedCount: types.number,
})
