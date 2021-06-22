import { types } from 'mobx-state-tree'

export const Album = types.model('Album', {
  id: types.number,
  name: types.string,
  picUrl: types.string,
  tns: types.array(types.frozen()),
  pic_str: types.maybe(types.string),
  pic: types.number,
})
