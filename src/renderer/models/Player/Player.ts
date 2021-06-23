import {
  applySnapshot,
  getSnapshot,
  SnapshotOut,
  types,
  cast,
} from 'mobx-state-tree'

import { History, history } from './History'
import { Lyric, lyric } from './Lyric'
import { PrivilegeSnapshotIn } from './Privilege'
import { Queue, queue, QueueSnapshotIn } from './Queue'
import { SongSnapshotIn } from './Song'
import { Track, TrackSnapshotIn } from './Track'

export enum OrderEnum {
  Repeat = 'Repeat',
  Shuffle = 'Shuffle',
  RepeatOne = 'RepeatOne',
}

export const Player = types
  .model('Player', {
    tracks: types.array(Track),
    queue: Queue,
    history: History,
    volume: 0.5, // [0, 1]
    lyric: Lyric,
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
      return self.queue.songs.findIndex(
        (song) => song.id === self.currTrack?.song.id,
      )
    },
    isInTrack(song: SongSnapshotIn) {
      return self.currTrack?.song.id === song.id
    },
  }))
  // base actions
  .actions((self) => ({
    addTrack(trackSnapshot: TrackSnapshotIn) {
      self.tracks.push(trackSnapshot)
      self.history.push(trackSnapshot.song)
    },
    clearTracks() {
      self.tracks.clear()
    },
    setVolume(percentage: number) {
      self.volume = percentage * 1
    },
    replaceQueue(queueSnapshot: QueueSnapshotIn) {
      applySnapshot(self.queue, queueSnapshot)
    },
    insertOneToQueue(song: SongSnapshotIn) {
      const songIndex = self.queue.songs.findIndex(({ id }) => id === song.id)
      if (songIndex >= 0) {
        self.queue.songs.splice(songIndex, 1)
      }
      self.queue.songs.splice(self.currTrackIndex + 1, 0, song)
    },
    insertManyToQueue(songs: SongSnapshotIn[]) {
      songs.forEach((song) => {
        const songIndex = self.queue.songs.findIndex(({ id }) => id === song.id)
        if (songIndex >= 0) {
          self.queue.songs.splice(songIndex, 1)
        }
      })
      songs.forEach((song, index) => {
        self.queue.songs.splice(self.currTrackIndex + index + 1, 0, song)
      })
    },
  }))
  .actions((self) => ({
    replaceTrack(trackSnapshot: TrackSnapshotIn) {
      trackSnapshot.playing = true
      self.tracks.replace([cast(trackSnapshot)])
      self.history.push(trackSnapshot.song)
    },
  }))
  .actions((self) => ({
    tryReplaceTrack(
      trackSnapshot: TrackSnapshotIn,
      options?: {
        privilege?: PrivilegeSnapshotIn | undefined
      },
    ) {
      const isInTrack = self.isInTrack(trackSnapshot.song)
      const unavailable = !(options?.privilege?.cp ?? true)
      const canReplace = !(isInTrack || unavailable)
      if (canReplace) self.replaceTrack(trackSnapshot)
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
      const index = mod(nth, self.queue.size)
      self.replaceTrack({
        song: getSnapshot(self.queue.songs[index]),
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
    playPrev() {
      switch (self.order) {
        case OrderEnum.RepeatOne:
        case OrderEnum.Repeat: {
          self.playPrevSibling()
          break
        }
        case OrderEnum.Shuffle: {
          self.replaceTrack({
            song: self.history.recentPlayedSong,
          })
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
  // actions on osd lyric process
  .actions((self) => ({
    __LYRIC__PROCESS__Play__: self.play,
    __LYRIC__PROCESS__Pause__: self.pause,
    __LYRIC__PROCESS__PlayNth__: self.playNth,
    __LYRIC__PROCESS__PlayNextSibling__: self.playNextSibling,
    __LYRIC__PROCESS__PlayPrev__: self.playPrev,
    __LYRIC__PROCESS__Repeat__: self.repeat,
    __LYRIC__PROCESS__Shuffle__: self.shuffle,
    __LYRIC__PROCESS__RepeatOne__: self.repeatOne,
  }))

export type PlayerSnapshotOut = SnapshotOut<typeof Player>

export const player = Player.create({
  queue,
  history,
  lyric,
})
