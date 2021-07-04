import { uniqBy } from 'lodash'
import { Instance, types } from 'mobx-state-tree'

import { playlistMap } from '@/cache'

import { GlobalTagStore, TagInstance } from './GlobalTag.store'
import { getMst } from './getMst'

const globalTagStore = getMst(GlobalTagStore)

export const PlaylistTagStore = types
  .model('PlaylistTagStore', {
    id: types.number,
    selectedTagIds: types.array(types.number),
  })
  .views((self) => ({
    get songIds() {
      return playlistMap.get(self.id)?.trackIds.map(({ id }) => id) ?? []
    },
    get _songTagMap() {
      const _songTagMap = new Map<number, TagInstance[]>()
      this.songIds.forEach((songId) => {
        _songTagMap.set(
          songId,
          globalTagStore.songTagMap.get(String(songId)) ?? [],
        )
      })
      return _songTagMap
    },
    get tags() {
      return [...this._songTagMap.values()]
    },
    get flatTags() {
      const _flatTags: TagInstance[] = []
      this.tags.forEach((tags) => tags.forEach((tag) => _flatTags.push(tag)))
      return _flatTags
    },
    get uniqTags() {
      return uniqBy(this.flatTags, 'id')
    },
    hasTag(songId: number) {
      return Boolean(this._songTagMap.get(songId)?.length)
    },
    get songIdsWithoutTags() {
      return this.songIds.filter((songId) => !this.hasTag(songId))
    },
  }))
  .actions((self) => ({
    toggleTag(tagId: number) {
      if (self.selectedTagIds.includes(tagId)) {
        self.selectedTagIds.remove(tagId)
      } else {
        self.selectedTagIds.push(tagId)
      }
    },
  }))

export type PlaylistTagStoreInstance = Instance<typeof PlaylistTagStore>
