import { types } from 'mobx-state-tree'

import { InputStore, ScrollStore, TagStore } from '@/stores'

export const PlaylistStore = types.compose(InputStore, ScrollStore, TagStore)
