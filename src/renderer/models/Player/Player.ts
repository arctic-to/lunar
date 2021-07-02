import {
  applySnapshot,
  getSnapshot,
  SnapshotOut,
  types,
  cast,
} from 'mobx-state-tree'

import { isSongAvailable } from '@/stores/Privilege.store'

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
    isCurrSong(song: SongSnapshotIn) {
      return self.track.song?.id === song.id
    },
    get currSongIndex() {
      return self.queue.songs.findIndex(this.isCurrSong)
    },
  }))
  // base actions
  .actions((self) => ({
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
        self.queue.songs.splice(self.currSongIndex + 1, 0, song)
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
        self.queue.songs.splice(self.currSongIndex + index + 1, 0, song)
      })
    },
  }))
  .actions((self) => ({
    replaceSong(songSnapshot: SongSnapshotIn) {
      self.track.song = cast(songSnapshot)
      self.track.play()
      self.track.setCurrentTime(0)
      self.history.push(songSnapshot)
    },
    tryReplaceSong(songSnapshot: SongSnapshotIn) {
      const isCurrSong = self.isCurrSong(songSnapshot)
      const available = isSongAvailable(songSnapshot)
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
      self.replaceSong(getSnapshot(self.queue.modGet(nth)))
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
      self.playNth(self.currSongIndex)
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
