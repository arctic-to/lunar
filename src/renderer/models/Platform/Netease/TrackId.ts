import { types } from 'mobx-state-tree'

export const TrackId = types.model('TrackId', {
  id: types.number,
  v: types.number,
  at: types.number,
  alg: types.null,
})
