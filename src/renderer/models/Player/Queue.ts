import { SnapshotIn, types } from 'mobx-state-tree'

import { getCachedSongs } from '@/cache'
import { mod } from '@/utils'

import { SongSnapshotIn } from './Song'

export const Queue = types
  .model('Queue', {
    songIds: types.array(types.number),
  })
  .views((self) => ({
    // https://github.com/mobxjs/mobx-state-tree/issues/409#issue-261406018
    get songs() {
      return getCachedSongs(self.songIds)
    },
    get size() {
      return self.songIds.length
    },
  }))
  .views((self) => ({
    modGet(n: number): SongSnapshotIn | undefined {
      return self.songs[mod(n, self.size)]
    },
  }))

export type QueueSnapshotIn = SnapshotIn<typeof Queue>

export const queue = Queue.create()
