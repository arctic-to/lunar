import { types } from 'mobx-state-tree'

import { Track, TrackSnapshot } from './Track'

export const Player = types
  .model('Player', {
    tracks: types.array(Track),
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
  }))
  .actions((self) => ({
    replaceTrack(trackSnapshot: TrackSnapshot) {
      self.tracks.pop()
      self.addTrack(trackSnapshot)
    },
  }))

export const player = Player.create()
