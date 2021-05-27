import { SnapshotOut, types } from 'mobx-state-tree'
import qs from 'qs'
import useSWR from 'swr'

import { usePlatform } from '@/models'
import { Playlist } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export function useUserPlaylist(id?: string) {
  const { netease } = usePlatform()
  const myId = netease?.profile?.userId
  const uid = id ?? myId
  const { data, error } = useSWR<UserPlaylistResponseSnapshotOut>(
    // If with credentials, the request of my playlists will return all playlist
    uid
      ? [
          `/user/playlist?${qs.stringify({
            uid,
            limit: 30,
            offset: 0,
          })}`,
          false,
        ]
      : null,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}

type UserPlaylistResponseSnapshotOut = SnapshotOut<typeof UserPlaylistResponse>
const UserPlaylistResponse = types.model('UserPlaylistResponse', {
  version: types.string,
  more: types.boolean,
  playlist: types.array(Playlist),
  code: types.number,
})
