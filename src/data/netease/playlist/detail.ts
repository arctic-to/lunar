import { SnapshotOut, types } from 'mobx-state-tree'
import useSWR from 'swr'
import { Maybe } from 'yup/lib/types'

import { PlaylistDetail, Privilege } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export function usePlaylistDetail(id: Maybe<number | string>) {
  const { data, error } = useSWR<PlaylistDetailResponseSnapshotOut>(
    id ? `/playlist/detail?id=${id}` : null,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}

export type PlaylistDetailResponseSnapshotOut = SnapshotOut<
  typeof PlaylistDetailResponse
>
const PlaylistDetailResponse = types.model('PlaylistDetailResponse', {
  code: types.number,
  relatedVideos: types.null,
  playlist: PlaylistDetail,
  urls: types.null,
  privileges: types.array(Privilege),
})
