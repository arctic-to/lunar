import { types, flow, cast, isAlive, SnapshotOut } from 'mobx-state-tree'
import { AsyncReturnType } from 'type-fest'

import { fetcher } from '@/data/netease/fetcher'
import { matchUnofficialSong } from '@/data/unofficial'
import {
  deleteUnofficialSongSourceMapItem,
  getSongSourceKind,
  SongSourceKind,
} from '@/stores'
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
      /**
       * - undefined: initial value
       * - empty string: no available url
       */
      url: types.maybe(types.string),
      lyric: types.maybeNull(Lyric),
    }),
  )
  .actions((self) => ({
    trySetUrl(url: string) {
      if (isAlive(self)) {
        self.url = url
      }
    },
  }))
  .actions((self) => ({
    fetchSongUrl: flow(function* () {
      switch (getSongSourceKind(self.id)) {
        case SongSourceKind.Netease: {
          const {
            data: [song],
          } = yield fetcher(`/song/url?id=${self.id}`)
          self.trySetUrl(song.url || '')
          break
        }
        case SongSourceKind.Unofficial: {
          const source: AsyncReturnType<typeof matchUnofficialSong> =
            yield matchUnofficialSong(self)
          if (source) {
            self.trySetUrl(source.url)
          } else {
            deleteUnofficialSongSourceMapItem(self.id)
            self.trySetUrl('')
          }
        }
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

      if (self.url === undefined) {
        self.fetchSongUrl()
      }
      if (!self.lyric) {
        self.fetchLyrics()
      }
    },
  }))
