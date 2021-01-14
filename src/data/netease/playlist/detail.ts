import { SnapshotIn, types } from 'mobx-state-tree'
import useSWR from 'swr'

import { PlaylistDetail, Privilege } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export function usePlaylistDetail(id: number | null) {
  const { data, error } = useSWR<PlaylistDetailResponseSnapshot>(
    id === null ? null : `/playlist/detail?id=${id}`,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}

type PlaylistDetailResponseSnapshot = SnapshotIn<typeof PlaylistDetailResponse>
const PlaylistDetailResponse = types.model('PlaylistDetailResponse', {
  code: types.number,
  relatedVideos: types.null,
  playlist: PlaylistDetail,
  urls: types.null,
  privileges: types.array(Privilege),
})
