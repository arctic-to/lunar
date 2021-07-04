import { types } from 'mobx-state-tree'

import { ScrollStore } from '@/stores'

export const PlaylistStore = types.compose(
  'PlaylistStore',
  ScrollStore,
  types.model({}),
)
