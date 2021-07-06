import {
  applySnapshot,
  getSnapshot,
  SnapshotOut,
  types,
  cast,
} from 'mobx-state-tree'

import { isSongAvailable } from '@/stores'

import { History, history } from './History'
import { OsdLyric, osdLyric } from './OsdLyric'
import { Queue, queue, QueueSnapshotIn } from './Queue'
import { SongSnapshotIn } from './Song'
import { Track, track, TrackSong } from './Track'

export enum OrderEnum {
  Repeat = 'Repeat',
  Shuffle = 'Shuffle',
  RepeatOne = 'RepeatOne',
}

export const Player = types
  .model('Player', {
    track: Track,
    queue: Queue,
    history: History,
    osdLyric: OsdLyric,
    order: types.optional(
      types.enumeration('Order', Object.values(OrderEnum)),
      OrderEnum.Repeat,
    ),
  })
  .views((self) => ({
    isCurrSong(songId: number) {
      return self.track.song?.id === songId
    },
    get currSongIndex() {
      return self.queue.songIds.findIndex(this.isCurrSong)
    },
  }))
  // base actions
  .actions((self) => ({
    replaceQueue(queueSnapshot: QueueSnapshotIn) {
      applySnapshot(self.queue, {
        ...queueSnapshot,
        songIds: queueSnapshot.songIds?.filter(isSongAvailable),
      })
    },
    insertOneToQueue(song: SongSnapshotIn) {
      const songIndex = self.queue.songIds.findIndex((id) => id === song.id)
      if (songIndex >= 0) {
        self.queue.songIds.splice(songIndex, 1)
      }
      if (isSongAvailable(song.id)) {
        self.queue.songIds.splice(self.currSongIndex + 1, 0, song.id)
      }
    },
    insertManyToQueue(songs: SongSnapshotIn[]) {
      songs.forEach((song) => {
        const songIndex = self.queue.songIds.findIndex((id) => id === song.id)
        if (songIndex >= 0) {
          self.queue.songIds.splice(songIndex, 1)
        }
      })
      songs
        .filter((song) => isSongAvailable(song.id))
        .forEach((song, index) => {
          self.queue.songIds.splice(self.currSongIndex + index + 1, 0, song.id)
        })
    },
  }))
  .actions((self) => ({
    replaceSong(songSnapshot: SongSnapshotIn) {
      self.track.song = cast(songSnapshot)
      self.track.play()
      // unobserving is necessary, otherwise `currentTime`
      // may be overrided by observer after we reset it.
      self.track.unobserveCurrentTime()
      // Authough <audio> will reset `currentTime` to 0
      // when its `src` changes to be available, it is
      // after we have gotten the song url.
      // Therefore it is needed to set it manually
      // to maintain UI consistency(e.g. progress bar).
      self.track.setCurrentTime(0)
      self.history.push(songSnapshot)
    },
    tryReplaceSong(songSnapshot: SongSnapshotIn) {
      const isCurrSong = self.isCurrSong(songSnapshot.id)
      const available = isSongAvailable(songSnapshot.id)
      const canReplace = !isCurrSong && available
      if (canReplace) this.replaceSong(songSnapshot)
    },
    setNextSong(songSnapshot: SongSnapshotIn) {
      // Create instance manually, otherwise mst will create it lazily.
      // https://github.com/mobxjs/mobx-state-tree/issues/810
      self.track.nextSong = TrackSong.create(songSnapshot)
    },
  }))
  .actions((self) => ({
    playNth(nth: number) {
      const song = self.queue.modGet(nth)
      if (song) {
        self.replaceSong(song)
      }
    },
  }))
  .actions((self) => ({
    playPrev() {
      switch (self.order) {
        case OrderEnum.RepeatOne:
        case OrderEnum.Repeat: {
          self.playNth(self.currSongIndex - 1)
          break
        }
        case OrderEnum.Shuffle: {
          self.replaceSong(self.history.recentPlayedSong)
        }
      }
    },
    playNext() {
      if (self.track.nextSong) {
        self.replaceSong(getSnapshot(self.track.nextSong)!)
      }
    },
    replay() {
      if (self.track.song) {
        // let mst reconcile it and keep properties
        // assigned in `afterCreate` hook
        self.replaceSong(getSnapshot(self.track.song)!)
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

export type PlayerSnapshotOut = SnapshotOut<typeof Player>

export const player = Player.create({
  track,
  queue,
  history,
  osdLyric,
})
