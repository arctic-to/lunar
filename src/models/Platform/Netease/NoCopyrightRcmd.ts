import { types } from 'mobx-state-tree'

export const NoCopyrightRcmd = types.model('NoCopyrightRcmd', {
  type: types.number,
  typeDesc: types.string,
  songId: types.maybeNull(types.string),
})
