import { types, flow, SnapshotIn } from 'mobx-state-tree'

import { fetcher } from '@/data'

const Track = types
  .model({
    songId: types.number,
    playing: false,
    songUrl: '',
  })
  .actions((self) => ({
    fetchSongUrl: flow(function* () {
      const id = self.songId
      const {
        data: [song],
      } = yield fetcher(`/song/url?id=${id}`)

      self.songUrl = song.url
    }),
  }))

type TrackSnapshot = SnapshotIn<typeof Track>

export const Player = types
  .model('Player', { tracks: types.array(Track) })
  // base actions
  .actions((self) => ({
    addTrack(trackSnapshot: TrackSnapshot) {
      const track = Track.create(trackSnapshot)
      track.fetchSongUrl()
      self.tracks.push(track)
    },
    clearTracks() {
      self.tracks.clear()
    },
  }))
  .actions((self) => ({
    replaceTrack(trackSnapshot: TrackSnapshot) {
      self.tracks.pop()
      self.addTrack(trackSnapshot)
    },
  }))

export const player = Player.create({
  tracks: [],
})
