import { SnapshotOut, types } from 'mobx-state-tree'
import { useEffect } from 'react'
import useSWR from 'swr'
import { Maybe } from 'yup/lib/types'

import { Privilege, Track } from '@/models/Platform/Netease'
import { getMst, PrivilegeStore } from '@/stores'

import { fetcher } from '../fetcher'

const privilegeStore = getMst(PrivilegeStore)

export function useSongDetail(songIds: Maybe<number[]>) {
  const { data, error } = useSWR<SongDetailResponseSnapshot>(
    songIds ? `/song/detail?ids=${songIds.join()}` : null,
    fetcher,
  )

  useEffect(() => {
    if (data) {
      privilegeStore.setSongPrivilegeMap(data.songs, data.privileges)
    }
  }, [data])

  return {
    loading: !data && !error,
    data,
    error,
  }
}

type SongDetailResponseSnapshot = SnapshotOut<typeof SongDetailResponse>
const SongDetailResponse = types.model('SongDetailResponse', {
  code: types.number,
  songs: types.array(Track),
  privileges: types.array(Privilege),
})
