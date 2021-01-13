import { getSnapshot, types } from 'mobx-state-tree'

import { Song, SongSnapshot } from './Song'
import { Track, TrackSnapshot } from './Track'

export enum OrderEnum {
  Repeat = 'Repeat',
  Shuffle = 'Shuffle',
  RepeatOne = 'RepeatOne',
}

export const Player = types
  .model('Player', {
    tracks: types.array(Track),
    queue: types.array(Song),
    volume: 1, // [0, 1]
    order: types.optional(
      types.enumeration('Order', Object.values(OrderEnum)),
      OrderEnum.Repeat,
    ),
  })
  .views((self) => ({
    get currTrack() {
      const [currentTrack = undefined] = self.tracks
      return currentTrack
    },
  }))
  .views((self) => ({
    get currTrackIndex() {
      return self.queue.findIndex((song) => song.id === self.currTrack?.song.id)
    },
  }))
  // base actions
  .actions((self) => ({
    addTrack(trackSnapshot: TrackSnapshot) {
      self.tracks.push(trackSnapshot)
    },
    clearTracks() {
      self.tracks.clear()
    },
    setVolume(percentage: number) {
      self.volume = percentage * 1
    },
    replaceQueue(songSnapshots: SongSnapshot[]) {
      self.queue.clear()
      self.queue.push(...songSnapshots)
    },
  }))
  .actions((self) => ({
    replaceTrack(trackSnapshot: TrackSnapshot) {
      self.tracks.pop()
      self.addTrack(trackSnapshot)
    },
  }))
  .actions((self) => ({
    play() {
      self.currTrack?.play()
    },
    pause() {
      self.currTrack?.pause()
    },
    playNth(nth: number) {
      const mod = (n: number, m: number) => ((n % m) + m) % m
      const index = mod(nth, self.queue.length)
      self.replaceTrack({
        song: getSnapshot(self.queue[index]),
        playing: true,
      })
    },
  }))
  .actions((self) => ({
    playPrevSibling() {
      self.playNth(self.currTrackIndex - 1)
    },
    playNextSibling() {
      self.playNth(self.currTrackIndex + 1)
    },
  }))
  .actions((self) => ({
    handleEnded() {
      switch (self.order) {
        case OrderEnum.Repeat: {
          self.playNextSibling()
          break
        }
        case OrderEnum.Shuffle: {
          self.playNth(Math.floor(Math.random() * self.queue.length))
          break
        }
        case OrderEnum.RepeatOne: {
          self.playNth(self.currTrackIndex)
        }
      }
    },
    playPrev() {
      switch (self.order) {
        case OrderEnum.RepeatOne:
        case OrderEnum.Repeat: {
          self.playPrevSibling()
          break
        }
        case OrderEnum.Shuffle: {
          self.playNth(Math.floor(Math.random() * self.queue.length))
          break
        }
      }
    },
    playNext() {
      switch (self.order) {
        case OrderEnum.RepeatOne:
        case OrderEnum.Repeat: {
          self.playNextSibling()
          break
        }
        case OrderEnum.Shuffle: {
          self.playNth(Math.floor(Math.random() * self.queue.length))
          break
        }
      }
    },
  }))
  .actions((self) => ({
    repeat() {
      self.order = OrderEnum.Repeat
    },
    shuffle() {
      self.order = OrderEnum.Shuffle
    },
    repeatOne() {
      self.order = OrderEnum.RepeatOne
    },
  }))

export const player = Player.create()
