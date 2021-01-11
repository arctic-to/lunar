import { types } from 'mobx-state-tree'

export const Author = types.model('Author', {
  id: types.number,
  name: types.string,
  tns: types.array(types.frozen()),
  alias: types.array(types.frozen()),
})
