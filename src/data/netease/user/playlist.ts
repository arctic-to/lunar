import { SnapshotOut, types } from 'mobx-state-tree'
import useSWR from 'swr'

import { usePlatform } from '@/models'
import { Playlist } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export function useUserPlaylist() {
  const { netease } = usePlatform()
  const userId = netease?.profile?.userId
  const { data, error } = useSWR<UserPlaylistResponseSnapshotOut>(
    // If with credentials, the request will return all playlist
    userId ? [`/user/playlist?uid=${userId}&limit=30&offset=0`, false] : null,
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
