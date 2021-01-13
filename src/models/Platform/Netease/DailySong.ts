import { types } from 'mobx-state-tree'

import { Privilege } from './Privilege'
import { Track } from './Track'

export const DailySong = types.compose(
  'DailySong',
  Track,
  types.model({
    reason: types.string,
    privilege: Privilege,
    alg: types.string,
  }),
)
