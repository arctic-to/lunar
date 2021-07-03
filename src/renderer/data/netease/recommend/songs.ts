import { SnapshotOut, types } from 'mobx-state-tree'
import { useEffect } from 'react'
import useSWR from 'swr'

import { Privilege, Track } from '@/models/Platform/Netease'
import { getMst, PrivilegeStore, setSongMap } from '@/stores'

import { fetcher } from '../fetcher'

const privilegeStore = getMst(PrivilegeStore)

export function useRecommedSongs() {
  const { data, error } = useSWR<RecommedSongsResponseSnapshot>(
    '/recommend/songs',
    fetcher,
  )

  useEffect(() => {
    if (data) {
      setSongMap(data.data.dailySongs)
      privilegeStore.setSongPrivilegeMap(
        data.data.dailySongs,
        data.data.dailySongs.map((dailySong) => dailySong.privilege),
      )
    }
  }, [data])

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
    dailySongs: types.array(
      types.compose(
        'DailySong',
        Track,
        types.model({
          reason: types.string,
          privilege: Privilege,
          alg: types.string,
        }),
      ),
    ),
    orderSongs: types.array(types.frozen()),
    recommendReasons: types.array(
      types.model({
        songId: types.number,
        reason: types.string,
      }),
    ),
  }),
})
