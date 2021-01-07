import { types, flow, SnapshotIn, Instance } from 'mobx-state-tree'
import { SECOND } from 'unit-of-time'

import { fetcher } from '@/data'

import { Song } from './Song'

export const Track = types
  .model({
    song: Song,
    playing: false,
    songUrl: '',
    currentTime: 0, // ms
    currentTimeSetTimes: 0,
    volume: 1, // [0, 1]
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
    increaseCurrentTime() {
      const nextTime = self.currentTime + SECOND
      const overflow = nextTime > self.song.dt
      if (overflow) {
        self.currentTime = 0
        self.pause()
      } else {
        self.currentTime = nextTime
      }
    },
    setCurrentTime(percentage: number) {
      self.currentTime = percentage * self.song.dt
      self.currentTimeSetTimes++
    },
    setVolume(percentage: number) {
      self.volume = percentage * 1
    },
  }))
  .actions((self) => ({
    fetchSongUrl: flow(function* () {
      const id = self.song.id
      const {
        data: [song],
      } = yield fetcher(`/song/url?id=${id}`)
      self.songUrl = song.url
    }),
  }))
  .volatile(() => ({
    timeoutID: null as null | NodeJS.Timeout,
  }))
  .actions((self) => ({
    observeCurrentTime() {
      if (self.timeoutID) return
      self.timeoutID = setInterval(() => {
        self.increaseCurrentTime()
      }, SECOND)
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
      self.fetchSongUrl()
    },
    beforeDestroy() {
      self.pause()
    },
  }))

export type TrackSnapshot = SnapshotIn<typeof Track>
export type TrackInstance = Instance<typeof Track>
