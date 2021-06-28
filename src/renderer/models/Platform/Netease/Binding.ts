import { types } from 'mobx-state-tree'

export const Binding = types.model({
  tokenJsonStr: types.string,
  expiresIn: types.number,
  bindingTime: types.number,
  expired: types.boolean,
  refreshTime: types.number,
  url: types.string,
  userId: types.number,
  id: types.number,
  type: types.number,
})
