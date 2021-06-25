import { types } from 'mobx-state-tree'

import { Privilege } from './Privilege'
import { Track } from './Track'

export const HotSong = types.compose(
  'HotSong',
  Track,
  types.model({
    privilege: Privilege,
  }),
)
