import { SnapshotIn, SnapshotOut, types } from 'mobx-state-tree'

export const Likelist = types
  .model('Likelist', {
    ids: types.array(types.number),
    checkPoint: types.Date,
  })
  .views((self) => ({
    get idset() {
      return new Set(self.ids)
    },
  }))
  .actions((self) => ({
    add(id: number) {
      if (!self.idset.has(id)) self.ids.push(id)
    },
    delete(id: number) {
      if (self.idset.has(id)) self.ids.remove(id)
    },
  }))

export type LikelistSnapshotIn = SnapshotIn<typeof Likelist>
export type LikelistSnapshotOut = SnapshotOut<typeof Likelist>
