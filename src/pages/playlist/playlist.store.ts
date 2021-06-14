import { types } from 'mobx-state-tree'

import { InputStore, ScrollStore, PlaylistTagStore } from '@/stores'

export const PlaylistStore = types.compose(
  InputStore,
  ScrollStore,
  PlaylistTagStore,
)
