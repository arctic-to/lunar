import { applySnapshot, cast, types } from 'mobx-state-tree'

import { PlaylistSnapshotOut } from '@/models/Player'

import { ViewPlaylist } from './ViewPlaylist'
import { ViewState } from './ViewState'

export const Playlists = types
  .model('Playlists', {
    viewPlaylists: types.array(ViewPlaylist),
    viewStateMap: types.map(ViewState),
  })
  .actions((self) => ({
    setPlaylists(playlists: PlaylistSnapshotOut[]) {
      /** create default state */
      playlists.forEach(({ id }) => {
        if (!self.viewStateMap.has(String(id))) {
          self.viewStateMap.put({ id: String(id) })
        }
      })

      const viewPlaylists = playlists.map((playlist) =>
        Object.assign(playlist, {
          viewState: playlist.id,
        }),
      )
      viewPlaylists.forEach((viewPlaylist, index) => {
        if (self.viewPlaylists[index]) {
          /** maintain object reference */
          applySnapshot(self.viewPlaylists[index], viewPlaylist)
        } else {
          self.viewPlaylists[index] = cast(viewPlaylist)
        }
      })
    },
  }))

export const playlists = Playlists.create()
