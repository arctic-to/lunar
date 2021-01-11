import { SnapshotOut, types } from 'mobx-state-tree'
import useSWR from 'swr'

import { DailySong } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export function useRecommedSongs() {
  const { data, error } = useSWR<RecommedSongsResponseSnapshot>(
    '/recommend/songs',
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}

type RecommedSongsResponseSnapshot = SnapshotOut<typeof RecommedSongsResponse>
const RecommedSongsResponse = types.model('RecommedSongsResponse', {
  code: types.number,
  data: types.model({
    dailySongs: types.array(DailySong),
    orderSongs: types.array(types.frozen()),
    recommendReasons: types.array(
      types.model({
        songId: types.number,
        reason: types.string,
      }),
    ),
  }),
})
