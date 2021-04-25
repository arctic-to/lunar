import { types } from 'mobx-state-tree'

export const Sidebar = types
  .model({
    minWidth: 296,
    width: 296,
  })
  .actions((self) => ({
    setWidth(width: number) {
      self.width = width
    },
  }))

export const sidebar = Sidebar.create()
