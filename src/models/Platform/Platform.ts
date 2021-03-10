import { types } from 'mobx-state-tree'

import { netease, Netease } from './Netease'

export const Platform = types.model('Platform', {
  netease: Netease,
})

export const platform = Platform.create({ netease })
