import { SnapshotOut, types } from 'mobx-state-tree'

export const Rectangle = types.model('Rectangle', {
  x: types.maybe(types.number),
  y: types.maybe(types.number),
  width: types.number,
  height: types.number,
})

type RectangleSnapshotOut = SnapshotOut<typeof Rectangle>

export const Lyric = types
  .model('Lyric', {
    show: false,
    bounds: types.optional(Rectangle, {
      width: 1200,
      height: 200,
    }),
  })
  .actions((self) => ({
    toggle() {
      self.show = !self.show
    },
    setBounds(bounds: RectangleSnapshotOut) {
      self.bounds = bounds
    },
  }))
  // actions on osd lyric process
  .actions((self) => ({
    __LYRIC__PROCESS__TOGGLE__: self.toggle,
  }))

export const lyric = Lyric.create()
