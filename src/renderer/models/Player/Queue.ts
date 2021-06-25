import { SnapshotIn, types } from 'mobx-state-tree'

import { mod } from '@/utils'

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
  .views((self) => ({
    modGet(n: number) {
      return self.songs[mod(n, self.size)]
    },
  }))

export type QueueSnapshotIn = SnapshotIn<typeof Queue>

export const queue = Queue.create()
