import {
  types,
  flow,
  SnapshotIn,
  Instance,
  cast,
  isAlive,
} from 'mobx-state-tree'
import { AsyncReturnType } from 'type-fest'
import { SECOND } from 'unit-of-time'

import { fetcher } from '@/data/netease/fetcher'
import { Renderer } from '@/ipc'
import { parseLyric } from '@/utils'

import { Song } from '../Song'

import { LyricResponseSnapshotIn, LyricStore } from './LyricStore'

export const Track = types
  .model('Track', {
    song: Song,
    playing: false,
    songUrl: '',
    currentTime: 0, // ms
    currentTimeSetTimes: 0, // Times of setting current time manually
    volume: 1, // Independent volume for every track
    lyricStore: types.maybeNull(LyricStore),
  })
  .views((self) => ({
    get percentage() {
      return self.currentTime / self.song.dt
    },
    get currentTimeInSecond() {
      return self.currentTime / SECOND
    },
  }))
  .actions((self) => ({
    play() {
      self.playing = true
    },
    pause() {
      self.playing = false
    },
  }))
  .actions((self) => ({
    _setCurrentTime(currentTime: number) {
      self.currentTime = currentTime
    },
    setCurrentTime(currentTime: number) {
      self.currentTime = currentTime
      self.currentTimeSetTimes++
    },
    setCurrentTimeByPercentage(percentage: number) {
      self.currentTime = percentage * self.song.dt
      self.currentTimeSetTimes++
    },
    setVolume(percentage: number) {
      self.volume = percentage * 1
    },
  }))
  .actions((self) => ({
    fetchSongUrl: flow(function* () {
      const {
        data: [song],
      } = yield fetcher(`/song/url?id=${self.song.id}`)

      if (isAlive(self)) {
        self.songUrl = song.url || ''
      }
    }),
    fetchLyrics: flow(function* () {
      const response: LyricResponseSnapshotIn = yield fetcher(
        `/lyric?id=${self.song.id}`,
      )
      const result: AsyncReturnType<typeof parseLyric> = yield parseLyric(
        response,
      )

      // Maybe the node has been destroyed if we switch songs in a flash.
      if (isAlive(self)) {
        self.lyricStore = cast({
          ...result,
          raw: response,
        })
      }
    }),
  }))
  .volatile(() => ({
    timeoutID: null as null | NodeJS.Timeout,
  }))
  .actions((self) => ({
    setTimeoutID(timeoutID: NodeJS.Timeout) {
      self.timeoutID = timeoutID
    },
  }))
  .actions((self) => ({
    currentTimeObserver(interval: number = SECOND) {
      return (e?: Event) => {
        if (self.timeoutID) return
        self.setTimeoutID(
          setInterval(() => {
            if (e) {
              if (!(e.target instanceof HTMLAudioElement)) return
              self._setCurrentTime(e.target?.currentTime * SECOND)
            } else {
              self._setCurrentTime(self.currentTime + interval)
            }
          }, interval),
        )
      }
    },
    unobserveCurrentTime() {
      if (self.timeoutID) {
        clearInterval(self.timeoutID)
        self.timeoutID = null
      }
    },
  }))
  // hooks
  .actions((self) => ({
    afterCreate() {
      if (process.env.RENDERER === Renderer.Lyric) return

      if (!self.songUrl) {
        self.fetchSongUrl()
      }
      if (!self.lyricStore) {
        self.fetchLyrics()
      }
    },
    beforeDestroy() {
      self.pause()
      /**
       * Must unobserve. After `beforeDestroy` executed,
       * the track can never be referenced.
       */
      self.unobserveCurrentTime()
    },
  }))

export type TrackSnapshotIn = SnapshotIn<typeof Track>
export type TrackInstance = Instance<typeof Track>
