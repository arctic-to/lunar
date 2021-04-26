import { castToSnapshot, types } from 'mobx-state-tree'

import { Playlists, playlists } from './Playlists/Playlists'

export const Sidebar = types
  .model('Sidebar', {
    minWidth: 296,
    width: 296,
    playlists: Playlists,
  })
  .actions((self) => ({
    setWidth(width: number) {
      self.width = width
    },
  }))

export const sidebar = Sidebar.create({ playlists: castToSnapshot(playlists) })
