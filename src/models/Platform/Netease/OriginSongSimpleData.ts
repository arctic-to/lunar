import { types } from 'mobx-state-tree'

export const OriginSongSimpleData = types.model('OriginSongSimpleData', {
  songId: types.number,
  name: types.string,
  artists: types.array(
    types.model({
      id: types.number,
      name: types.string,
    }),
  ),
  albumMeta: types.model({
    id: types.number,
    name: types.string,
  }),
})
