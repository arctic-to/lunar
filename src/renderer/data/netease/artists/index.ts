import { SnapshotOut, types } from 'mobx-state-tree'
import qs from 'qs'
import { useEffect } from 'react'
import useSWR from 'swr'

import { Privilege, Track } from '@/models/Platform/Netease'
import { getMst, PrivilegeStore } from '@/stores'

import { fetcher } from '../fetcher'
const privilegeStore = getMst(PrivilegeStore)

export function useArtists(id?: string) {
  const { data, error } = useSWR<ArtistsResponseSnapshot>(
    id ? `/artists?${qs.stringify({ id })}` : null,
    fetcher,
  )

  useEffect(() => {
    if (data) {
      privilegeStore.setSongPrivilegeMap(
        data.hotSongs,
        data.hotSongs.map((song) => song.privilege),
      )
    }
  }, [data])

  return {
    loading: !data && !error,
    data,
    error,
  }
}

type ArtistsResponseSnapshot = SnapshotOut<typeof ArtistsResponse>

const ArtistsResponse = types.model('ArtistsResponse', {
  artist: types.model({
    img1v1Id: types.number,
    topicPerson: types.number,
    alias: types.array(types.string),
    picId: types.number,
    briefDesc: types.string,
    musicSize: types.number,
    albumSize: types.number,
    picUrl: types.string,
    img1v1Url: types.string,
    followed: types.boolean,
    trans: types.string,
    name: types.string,
    id: types.number,
    publishTime: types.number,
    picId_str: types.string,
    img1v1Id_str: types.string,
    mvSize: types.number,
  }),
  hotSongs: types.array(
    types.compose(
      'HotSong',
      Track,
      types.model({
        privilege: Privilege,
      }),
    ),
  ),
  more: types.boolean,
  code: types.number,
})
