import { SnapshotIn, types } from 'mobx-state-tree'

import { Song } from './Song'

export const Queue = types
  .model('Queue', {
    songs: types.array(Song),
  })
  .views((self) => ({
    get size() {
      return self.songs.length
    },
  }))

export type QueueSnapshotIn = SnapshotIn<typeof Queue>

export const queue = Queue.create()
