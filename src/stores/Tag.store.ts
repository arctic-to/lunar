import { NeteaseCloudMusicTag } from '@prisma/client'
import { uniqBy } from 'lodash'
import { Instance, types } from 'mobx-state-tree'

export const Tag = types.model({
  id: types.identifierNumber,
  name: types.string,
})

export const TagStore = types
  .model({
    songTagMap: types.map(types.array(Tag)),
    selectedTagIds: types.array(types.number),
  })
  .views((self) => ({
    get tags() {
      return [...self.songTagMap.values()]
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
      songTagPairs.forEach(([songId, tags]) => {
        self.songTagMap.set(String(songId), tags)
      })
    },
    toggleTag(tagId: number) {
      if (self.selectedTagIds.includes(tagId)) {
        self.selectedTagIds.remove(tagId)
      } else {
        self.selectedTagIds.push(tagId)
      }
    },
  }))

export type TagInstance = Instance<typeof Tag>
export type TagStoreInstance = Instance<typeof TagStore>
