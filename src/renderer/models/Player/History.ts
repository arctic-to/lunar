import { Instance, SnapshotIn, types, getSnapshot } from 'mobx-state-tree'

import { Song, SongSnapshotIn } from './Song'

export const HistorySong = types.compose(
  'HistorySong',
  Song,
  types.model({
    playedAt: types.optional(types.Date, () => new Date()),
  }),
)
export type HistorySongSnapshotIn = SnapshotIn<typeof HistorySong>
export type HistorySongInstance = Instance<typeof HistorySong>

export interface AggregatedSong {
  songs: HistorySongInstance[]
  songSnapshot: SongSnapshotIn
}

export const History = types
  .model('History', {
    songs: types.array(HistorySong),
  })
  .views((self) => ({
    get aggregatedSongs() {
      const _aggregatedSongs: AggregatedSong[] = []
      let lastAggregatedSong: AggregatedSong | undefined

      self.songs.forEach((song) => {
        if (song.id === lastAggregatedSong?.songs[0].id) {
          lastAggregatedSong?.songs.push(song)
        } else {
          lastAggregatedSong = {
            songs: [song],
            songSnapshot: Object.assign({}, getSnapshot(song), {
              playedAt: undefined,
            }),
          }
          _aggregatedSongs.push(lastAggregatedSong)
        }
      })

      return _aggregatedSongs
    },
  }))
  .actions((self) => ({
    push(song: SongSnapshotIn) {
      self.songs.push(song)
    },
  }))

export const history = History.create()
