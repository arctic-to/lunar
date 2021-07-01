import { types, flow, cast, isAlive } from 'mobx-state-tree'
import { AsyncReturnType } from 'type-fest'

import { fetcher } from '@/data/netease/fetcher'
import { getUnofficialSongUrl } from '@/stores/Privilege.store'
import { parseLyric } from '@/utils'

import { Song } from '../Song'

import { LyricResponseSnapshotIn, LyricStore } from './LyricStore'

export const TrackSong = types
  .compose(
    'TrackSong',
    Song,
    types.model({
      url: '',
      lyricStore: types.maybeNull(LyricStore),
    }),
  )
  .views((self) => ({
    get title() {
      return `${self.name} - ${self.ar.map((ar) => ar.name).join(' & ')}`
    },
  }))
  .actions((self) => ({
    fetchSongUrl: flow(function* () {
      const {
        data: [song],
      } = yield fetcher(`/song/url?id=${self.id}`)

      if (isAlive(self)) {
        self.url = song.url || ''
      }
    }),
    fetchLyrics: flow(function* () {
      const response: LyricResponseSnapshotIn = yield fetcher(
        `/lyric?id=${self.id}`,
      )
      const result: AsyncReturnType<typeof parseLyric> = yield parseLyric(
        response,
      )

      // Maybe the node has been destroyed if we switch songs in a flash.
      // https://github.com/mobxjs/mobx-state-tree/issues/912#issuecomment-404465245
      if (isAlive(self)) {
        self.lyricStore = cast({
          ...result,
          raw: response,
        })
      }
    }),
  }))
  .actions((self) => ({
    afterCreate() {
      if (!self.url) {
        const unofficialSongUrl = getUnofficialSongUrl(self)
        if (unofficialSongUrl) {
          self.url = unofficialSongUrl
        } else {
          self.fetchSongUrl()
        }
      }
      if (!self.lyricStore) {
        self.fetchLyrics()
      }
    },
  }))
