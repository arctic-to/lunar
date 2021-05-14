import { SnapshotIn, types } from 'mobx-state-tree'
import qs from 'qs'
import useSWR from 'swr'

import { SongResult } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export enum SearchTypeEnum {
  Song = 1,
  Album = 10,
  Author = 100,
  Playlist = 1000,
  User = 1002,
  MV = 1004,
  Lyric = 1006,
}

interface Params {
  keywords: string
  limit?: number
  offset?: number
  type?: SearchTypeEnum
}
export function useCloudSearch({
  keywords,
  limit = 30,
  offset = 0,
  type = SearchTypeEnum.Song,
}: Params) {
  const { data, error } = useSWR<CloudSearchResponseSnapshotIn>(
    keywords
      ? `/cloudsearch?${qs.stringify({ keywords, limit, offset, type })}`
      : null,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}

type CloudSearchResponseSnapshotIn = SnapshotIn<typeof CloudSearchResponse>
const CloudSearchResponse = types.model('CloudSearchResponse', {
  result: types.model({
    songs: types.array(SongResult),
    songCount: types.number,
  }),
  code: types.number,
})
