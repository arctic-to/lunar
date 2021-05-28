import { types } from 'mobx-state-tree'

export const Artist = types.model('Artist', {
  id: types.number,
  name: types.string,
  tns: types.array(types.frozen()),
  alias: types.array(types.frozen()),
})
