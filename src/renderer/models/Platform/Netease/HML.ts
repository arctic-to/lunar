import { types } from 'mobx-state-tree'

export const HML = types.model('HML', {
  br: types.number,
  fid: types.number,
  size: types.number,
  vd: types.number,
})
