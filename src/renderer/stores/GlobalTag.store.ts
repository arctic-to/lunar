import { NeteaseCloudMusicTag } from '@prisma/client'
import { Instance, types } from 'mobx-state-tree'

export const Tag = types.model({
  id: types.identifierNumber,
  name: types.string,
})

export const GlobalTagStore = types
  .model('GlobalTagStore', {
    songTagMap: types.map(types.array(Tag)),
  })
  .actions((self) => ({
    setSongTagMap(songTagPairs: [number, NeteaseCloudMusicTag[]][]) {
      songTagPairs.forEach(([songId, tags]) => {
        self.songTagMap.set(String(songId), tags)
      })
    },
    replaceSongTag(songId: number, tags: TagInstance[]) {
      self.songTagMap.set(String(songId), tags)
    },
    removeSongTag(songId: number, tagId: number) {
      const oldSongTags = self.songTagMap.get(String(songId))!
      const newSongTags = oldSongTags.filter(({ id }) => id !== tagId)
      self.songTagMap.set(String(songId), newSongTags)
    },
  }))

export type TagInstance = Instance<typeof Tag>
