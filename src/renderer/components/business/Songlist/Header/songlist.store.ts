import { types } from 'mobx-state-tree'

import { InputStore, PlaylistTagStore } from '@/stores'

export const SonglistStore = types.compose(
  'SonglistStore',
  InputStore,
  PlaylistTagStore,
)
