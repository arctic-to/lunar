import { SnapshotOut, types } from 'mobx-state-tree'
import qs from 'qs'
import useSWR from 'swr'

import { ArtistDesc } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export function useArtistDesc(id: string) {
  const { data, error } = useSWR<ArtistDescResponseSnapshot>(
    `/artist/desc?${qs.stringify({ id })}`,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}

type ArtistDescResponseSnapshot = SnapshotOut<typeof ArtistDescResponse>
const ArtistDescResponse = types.compose(
  'ArtistDescResponse',
  ArtistDesc,
  types.model({
    code: types.number,
  }),
)
