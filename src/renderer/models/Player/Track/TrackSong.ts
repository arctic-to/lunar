import { types, flow, cast, isAlive, SnapshotOut } from 'mobx-state-tree'
import { AsyncReturnType } from 'type-fest'

import { fetcher } from '@/data/netease/fetcher'
import { getUnofficialSongUrl } from '@/stores/Privilege.store'
import { parseLyric } from '@/utils'

import { Song } from '../Song'

import { LyricResponseSnapshotIn, Lyric } from './Lyric'

export type TrackSongSnapshot = SnapshotOut<typeof TrackSong>
export const TrackSong = types
  .compose(
    'TrackSong',
    Song,
    types.model({
      title: '',
      url: '',
      lyric: types.maybeNull(Lyric),
    }),
  )
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
        self.lyric = cast({
          ...result,
          raw: response,
        })
      }
    }),
  }))
  .actions((self) => ({
    afterCreate() {
      self.title = `${self.name} - ${self.ar.map((ar) => ar.name).join(' & ')}`

      if (!self.url) {
        const unofficialSongUrl = getUnofficialSongUrl(self.id)
        if (unofficialSongUrl) {
          self.url = unofficialSongUrl
        } else {
          self.fetchSongUrl()
        }
      }
      if (!self.lyric) {
        self.fetchLyrics()
      }
    },
  }))
