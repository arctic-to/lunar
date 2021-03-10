import { SnapshotOut, types } from 'mobx-state-tree'
import useSWR from 'swr'

import { Likelist } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export function useLikelist() {
  const { data, mutate, error } = useSWR<LikelistResponseSnapshot>(
    `/likelist`,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    mutate,
    error,
  }
}

type LikelistResponseSnapshot = SnapshotOut<typeof LikelistResponse>
const LikelistResponse = types.compose(
  'LikelistResponse',
  Likelist,
  types.model({
    code: types.number,
  }),
)
