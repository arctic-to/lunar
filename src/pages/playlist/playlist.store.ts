import { cast, types } from 'mobx-state-tree'

import { InputStore, ScrollStore } from '@/stores'

export const PlaylistStore = types.compose(
  InputStore,
  ScrollStore,
  types
    .model({
      selectedTagIds: types.array(types.number),
    })
    .actions((self) => ({
      setSelectedTagIds(tagIds: number[]) {
        self.selectedTagIds = cast(tagIds)
      },
    })),
)

export const playlistStore = PlaylistStore.create()
