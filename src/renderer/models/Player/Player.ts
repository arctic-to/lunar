import {
  applySnapshot,
  getSnapshot,
  SnapshotOut,
  types,
  cast,
} from 'mobx-state-tree'

import { isSongAvailable } from '@/stores/Privilege.store'

import { History, history } from './History'
import { Lyric, lyric } from './Lyric'
import { Queue, queue, QueueSnapshotIn } from './Queue'
import { SongSnapshotIn } from './Song'
import { Track, TrackSnapshotIn } from './Track'

const VOLUMN_STEP = 0.1

export enum OrderEnum {
  Repeat = 'Repeat',
  Shuffle = 'Shuffle',
  RepeatOne = 'RepeatOne',
}

export const Player = types
  .model('Player', {
    tracks: types.array(Track),
    nextTracks: types.array(Track),
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
    turnUpVolume() {
      self.volume = Math.min(1, self.volume + VOLUMN_STEP)
    },
    turnDownVolume() {
      self.volume = Math.max(0, self.volume - VOLUMN_STEP)
    },
    replaceQueue(queueSnapshot: QueueSnapshotIn) {
      applySnapshot(self.queue, {
        ...queueSnapshot,
        songs: queueSnapshot.songs?.filter(isSongAvailable),
      })
    },
    insertOneToQueue(song: SongSnapshotIn) {
      const songIndex = self.queue.songs.findIndex(({ id }) => id === song.id)
      if (songIndex >= 0) {
        self.queue.songs.splice(songIndex, 1)
      }
      if (isSongAvailable(song)) {
        self.queue.songs.splice(self.currTrackIndex + 1, 0, song)
      }
    },
    insertManyToQueue(songs: SongSnapshotIn[]) {
      songs.forEach((song) => {
        const songIndex = self.queue.songs.findIndex(({ id }) => id === song.id)
        if (songIndex >= 0) {
          self.queue.songs.splice(songIndex, 1)
        }
      })
      songs.filter(isSongAvailable).forEach((song, index) => {
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
    setNextTrack(trackSnapshot: TrackSnapshotIn) {
      // Create instance manually, otherwise mst will reconcile it.
      self.nextTracks.replace([Track.create(trackSnapshot)])
    },
  }))
  .actions((self) => ({
    tryReplaceTrack(trackSnapshot: TrackSnapshotIn) {
      const isInTrack = self.isInTrack(trackSnapshot.song)
      const available = isSongAvailable(trackSnapshot.song)
      const canReplace = !isInTrack && available
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
    toggle() {
      self.currTrack?.toggle()
    },
    playNth(nth: number) {
      self.replaceTrack({
        song: getSnapshot(self.queue.modGet(nth)),
      })
    },
  }))
  .actions((self) => ({
    playPrev() {
      switch (self.order) {
        case OrderEnum.RepeatOne:
        case OrderEnum.Repeat: {
          self.playNth(self.currTrackIndex - 1)
          break
        }
        case OrderEnum.Shuffle: {
          self.replaceTrack({
            song: self.history.recentPlayedSong,
          })
        }
      }
    },
    playNext() {
      self.replaceTrack({ ...getSnapshot(self.nextTracks[0]) })
    },
    replay() {
      self.playNth(self.currTrackIndex)
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
    __LYRIC__PROCESS__PlayPrev__: self.playPrev,
    __LYRIC__PROCESS__PlayNext__: self.playNext,
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
