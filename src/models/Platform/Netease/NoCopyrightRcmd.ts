import { types } from 'mobx-state-tree'

export const NoCopyrightRcmd = types.model({
  type: types.number,
  typeDesc: types.string,
  songId: types.null,
})
