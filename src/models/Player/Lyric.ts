import { SnapshotOut, types } from 'mobx-state-tree'

export const Rectangle = types.model({
  x: types.maybe(types.number),
  y: types.maybe(types.number),
  width: types.number,
  height: types.number,
})

type RectangleSnapshotOut = SnapshotOut<typeof Rectangle>

export const Lyric = types
  .model({
    opened: false,
    bounds: types.optional(Rectangle, {
      width: 1200,
      height: 200,
    }),
  })
  .actions((self) => ({
    toggle() {
      self.opened = !self.opened
    },
    setPosition([x, y]: number[]) {
      self.bounds.x = x
      self.bounds.y = y
    },
    setBounds(bounds: RectangleSnapshotOut) {
      self.bounds = bounds
    },
  }))

export const lyric = Lyric.create()
