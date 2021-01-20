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
    currentTimeSetTimes: 0, // Times of setting current time manually
    volume: 1, // Independent volume for every track
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
    setCurrentTime(currentTime: number) {
      self.currentTime = currentTime
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
    observeCurrentTime(e: Event) {
      if (self.timeoutID) return

      self.timeoutID = setInterval(() => {
        if (!(e.target instanceof HTMLAudioElement)) return
        self.setCurrentTime(e.target?.currentTime * SECOND)
      }, SECOND / 10)
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
      /**
       * Must unobserve. After `beforeDestroy` executed,
       * the track can never be referenced.
       */
      self.unobserveCurrentTime()
    },
  }))

export type TrackSnapshot = SnapshotIn<typeof Track>
export type TrackInstance = Instance<typeof Track>
