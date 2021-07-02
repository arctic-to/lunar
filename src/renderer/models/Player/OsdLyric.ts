import { types } from 'mobx-state-tree'

export const OsdLyric = types
  .model('OsdLyric', {
    show: false,
  })
  .actions((self) => ({
    toggle() {
      self.show = !self.show
    },
  }))

export const osdLyric = OsdLyric.create()
