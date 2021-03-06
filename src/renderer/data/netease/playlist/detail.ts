import { SnapshotOut, types } from 'mobx-state-tree'
import { useEffect } from 'react'
import useSWR from 'swr'
import { Maybe } from 'yup/lib/types'

import { setPlaylistMap, setSongMap } from '@/cache'
import { PlaylistDetail, Privilege } from '@/models/Platform/Netease'
import { setPrivilegeMap } from '@/stores'

import { fetcher } from '../fetcher'

export function usePlaylistDetail(id: Maybe<number | string>) {
  const { data, error } = useSWR<PlaylistDetailResponseSnapshotOut>(
    id ? `/playlist/detail?id=${id}` : null,
    fetcher,
  )

  useEffect(() => {
    if (data) {
      setSongMap(data.playlist.tracks)
      setPlaylistMap(data.playlist)
      setPrivilegeMap(data.playlist.tracks, data.privileges)
    }
  }, [data])

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
