import { types } from 'mobx-state-tree'

export const ArtistResult = types.model('ArtistResult', {
  id: types.number,
  name: types.string,
  picUrl: types.string,
  alias: types.array(types.string),
  albumSize: types.number,
  picId: types.number,
  img1v1Url: types.string,
  img1v1: types.number,
  mvSize: types.number,
  followed: types.boolean,
  alia: types.array(types.string),
  trans: types.null,
})
