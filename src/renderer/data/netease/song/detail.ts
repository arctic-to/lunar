import { SnapshotIn, types } from 'mobx-state-tree'
import useSWR from 'swr'
import { Maybe } from 'yup/lib/types'

import { Privilege, Track } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export function useSongDetail(songIds: Maybe<number[]>) {
  const { data, error } = useSWR<SongDetailResponseSnapshot>(
    songIds ? `/song/detail?ids=${songIds.join()}` : null,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}

type SongDetailResponseSnapshot = SnapshotIn<typeof SongDetailResponse>
const SongDetailResponse = types.model('SongDetailResponse', {
  code: types.number,
  songs: types.array(Track),
  privileges: types.array(Privilege),
})
