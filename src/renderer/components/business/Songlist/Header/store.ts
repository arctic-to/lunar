import { types } from 'mobx-state-tree'

import { InputStore, PlaylistTagStore } from '@/stores'

export const NormalHeaderStore = types.compose(
  'NormalHeaderStore',
  InputStore,
  types.model({}),
)

export const PlaylistHeaderStore = types.compose(
  'PlaylistHeaderStore',
  InputStore,
  PlaylistTagStore,
)
