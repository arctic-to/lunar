import { types } from 'mobx-state-tree'

import { Privilege } from '../Privilege'
import { Track } from '../Track'

export const SongResult = types.compose(
  'SongResult',
  Track,
  types.model({
    privilege: Privilege,
  }),
)
