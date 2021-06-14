import { NeteaseCloudMusicTag } from '@prisma/client'
import { uniqBy } from 'lodash'
import { Instance, types } from 'mobx-state-tree'

import { GlobalTagStore, TagInstance } from './GlobalTag.store'
import { getMst } from './getMst'

const globalTagStore = getMst(GlobalTagStore)

export const PlaylistTagStore = types
  .model('PlaylistTagStore', {
    songIds: types.array(types.number),
    selectedTagIds: types.array(types.number),
  })
  .views((self) => ({
    get _songTagMap() {
      const _songTagMap = new Map<number, TagInstance[]>()
      self.songIds.forEach((songId) => {
        _songTagMap.set(
          songId,
          globalTagStore.songTagMap.get(String(songId)) ?? [],
        )
      })
      return _songTagMap
    },
  }))
  .views((self) => ({
    get tags() {
      return [...self._songTagMap.values()]
    },
  }))
  .views((self) => ({
    get flatTags() {
      const _flatTags: TagInstance[] = []
      self.tags.forEach((tags) => tags.forEach((tag) => _flatTags.push(tag)))
      return _flatTags
    },
  }))
  .views((self) => ({
    get uniqTags() {
      return uniqBy(self.flatTags, 'id')
    },
  }))
  .actions((self) => ({
    setSongTagMap(songTagPairs: [number, NeteaseCloudMusicTag[]][]) {
      self.songIds.replace(songTagPairs.map(([songId]) => songId))
      globalTagStore.setSongTagMap(songTagPairs)
    },
    toggleTag(tagId: number) {
      if (self.selectedTagIds.includes(tagId)) {
        self.selectedTagIds.remove(tagId)
      } else {
        self.selectedTagIds.push(tagId)
      }
    },
  }))

export type PlaylistTagStoreInstance = Instance<typeof PlaylistTagStore>
