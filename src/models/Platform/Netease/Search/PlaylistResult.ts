import { types } from 'mobx-state-tree'

export const PlaylistResult = types.model('PlaylistResult', {
  id: types.number,
  name: types.string,
  coverImgUrl: types.string,
  creator: types.model({
    nickname: types.string,
    userId: types.number,
    userType: types.number,
    authStatus: types.number,
    expertTags: types.array(types.string),
    experts: types.null,
  }),
  subscribed: types.boolean,
  trackCount: types.number,
  userId: types.number,
  playCount: types.number,
  bookCount: types.number,
  specialType: types.number,
  officialTags: types.null,
  description: types.string,
  highQuality: types.boolean,
})
