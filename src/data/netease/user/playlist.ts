import { SnapshotIn, types } from 'mobx-state-tree'
import useSWR from 'swr'

import { usePlatform } from '@/models'
import { Playlist } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export function useUserPlaylist() {
  const { netease } = usePlatform()
  const { data, error } = useSWR<UserPlaylistResponseSnapshot>(
    // If with credentials, the request will return all playlist
    [`/user/playlist?uid=${netease?.profile?.userId}&limit=30&offset=0`, false],
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}

type UserPlaylistResponseSnapshot = SnapshotIn<typeof UserPlaylistResponse>
const UserPlaylistResponse = types.model('UserPlaylistResponse', {
  version: types.string,
  more: types.boolean,
  playlist: types.array(Playlist),
  code: types.number,
})
