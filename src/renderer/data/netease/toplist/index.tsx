import { SnapshotIn, types } from 'mobx-state-tree'
import useSWR from 'swr'

import { Chart } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export function useToplist() {
  const { data, error } = useSWR<ToplistResponseSnapshot>('toplist', fetcher)

  return {
    loading: !data && !error,
    data,
    error,
  }
}

type ToplistResponseSnapshot = SnapshotIn<typeof ToplistResponse>

const ToplistResponse = types.model('ToplistResponse', {
  code: types.number,
  list: types.array(Chart),
  artistToplist: types.model({
    coverUrl: types.string,
    name: types.string,
    upateFrequency: types.string,
    position: types.number,
    updateFrequency: types.string,
  }),
})
