import { types, SnapshotIn, Instance } from 'mobx-state-tree'
import { SECOND } from 'unit-of-time'

import { correctPercentage } from '@/utils'

import { TrackSong } from './TrackSong'

const VOLUME_STEP = 0.1

export const Track = types
  .model('Track', {
    song: types.maybe(TrackSong),
    nextSong: types.maybe(TrackSong),
    playing: false,
    currentTime: 0, // ms
    currentTimeSetTimes: 0, // Times of setting current time manually
    volume: 0.5, // Independent volume for every track
  })
  .views((self) => ({
    get percentage() {
      return self.song ? self.currentTime / self.song.dt : 0
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
    toggle() {
      self.playing = !self.playing
    },
    setVolume(percentage: number) {
      self.volume = correctPercentage(percentage) * 1
    },
    turnUpVolume() {
      this.setVolume(self.volume + VOLUME_STEP)
    },
    turnDownVolume() {
      this.setVolume(self.volume - VOLUME_STEP)
    },
  }))
  .volatile(() => ({
    timeoutID: null as null | NodeJS.Timeout,
  }))
  .actions((self) => ({
    _setCurrentTime(currentTime: number) {
      self.currentTime = currentTime
    },
    setCurrentTime(currentTime: number) {
      this._setCurrentTime(currentTime)
      self.currentTimeSetTimes++
    },
    setCurrentTimeByPercentage(percentage: number) {
      if (self.song) {
        this._setCurrentTime(correctPercentage(percentage) * self.song.dt)
        self.currentTimeSetTimes++
      }
    },
    setTimeoutID(timeoutID: NodeJS.Timeout) {
      self.timeoutID = timeoutID
    },
    currentTimeObserver(e?: Event) {
      if (self.timeoutID) return
      const INTERVAL = SECOND

      this.setTimeoutID(
        setInterval(() => {
          if (e) {
            if (!(e.target instanceof HTMLAudioElement)) return
            this._setCurrentTime(e.target?.currentTime * SECOND)
          } else {
            this._setCurrentTime(self.currentTime + INTERVAL)
          }
        }, INTERVAL),
      )
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
export const track = Track.create()
