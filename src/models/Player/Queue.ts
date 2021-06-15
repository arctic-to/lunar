import { SnapshotIn, types } from 'mobx-state-tree'

import { Song } from './Song'

export const Queue = types.model('Queue', {
  songs: types.array(Song),
})

export type QueueSnapshotIn = SnapshotIn<typeof Queue>

export const queue = Queue.create()
