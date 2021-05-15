import { types } from 'mobx-state-tree'

import { SongResult } from './SongResult'

export const LyricResult = types.compose(
  'LyricResult',
  SongResult,
  types.model({
    tns: types.array(types.string),
    lyrics: types.array(types.string),
  }),
)
