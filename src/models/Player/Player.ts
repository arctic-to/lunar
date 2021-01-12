import { types } from 'mobx-state-tree'

import { Song, SongSnapshot } from './Song'
import { Track, TrackSnapshot } from './Track'

export const Player = types
  .model('Player', {
    tracks: types.array(Track),
    queue: types.array(Song),
    volume: 1, // [0, 1]
  })
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

export const player = Player.create()
