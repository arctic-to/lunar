import { types } from 'mobx-state-tree'

import { Netease, NeteaseSnapshot } from './Netease'

export const Platform = types
  .model('Platform', {
    netease: types.maybe(Netease),
  })
  .actions((self) => ({
    updateNetease(netease: NeteaseSnapshot) {
      self.netease = netease
    },
  }))

export const platform = Platform.create()
