import { SnapshotOut, types } from 'mobx-state-tree'
import qs from 'qs'
import useSWR from 'swr'

import { ArtistDetail } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export function useArtistDetail(id: string) {
  const { data, error } = useSWR<ArtistDetailResponseSnapshot>(
    `/artist/detail?${qs.stringify({ id })}`,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}

type ArtistDetailResponseSnapshot = SnapshotOut<typeof ArtistDetailResponse>
const ArtistDetailResponse = types.model('ArtistDetailResponse', {
  code: types.number,
  message: types.string,
  data: ArtistDetail,
})
