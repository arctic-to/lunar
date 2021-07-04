import { NeteaseCloudMusicTag } from '@prisma/client'
import Store from 'electron-store'
import { Instance, types } from 'mobx-state-tree'

type SongTagPairs = [number, NeteaseCloudMusicTag[]][]

const store = new Store<{ tagMap: SongTagPairs }>({
  name: 'tag_cache',
  defaults: { tagMap: [] },
})

export const Tag = types.model({
  id: types.identifierNumber,
  name: types.string,
})

export const GlobalTagStore = types
  .model('GlobalTagStore', {
    songTagMap: types.map(types.array(Tag)),
  })
  .actions((self) => ({
    setSongTagMap(songTagPairs: SongTagPairs) {
      songTagPairs.forEach(([songId, tags]) => {
        self.songTagMap.set(String(songId), tags)
      })
      store.set('tagMap', songTagPairs)
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
  .actions((self) => ({
    afterCreate() {
      self.setSongTagMap(store.get('tagMap'))
    },
  }))

export type TagInstance = Instance<typeof Tag>
