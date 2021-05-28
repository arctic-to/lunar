import { SnapshotOut, types } from 'mobx-state-tree'
import useSWR from 'swr'

import { PlaylistDetail, Privilege } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export function usePlaylistDetail(id: number | string | null) {
  const { data, error } = useSWR<PlaylistDetailResponseSnapshotOut>(
    id === null ? null : `/playlist/detail?id=${id}`,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}

type PlaylistDetailResponseSnapshotOut = SnapshotOut<
  typeof PlaylistDetailResponse
>
const PlaylistDetailResponse = types.model('PlaylistDetailResponse', {
  code: types.number,
  relatedVideos: types.null,
  playlist: PlaylistDetail,
  urls: types.null,
  privileges: types.array(Privilege),
})
