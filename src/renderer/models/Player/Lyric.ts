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
    translation: true,
    phonetic: false,
    overlay: false,
  })
  .actions((self) => ({
    toggle() {
      self.show = !self.show
    },
    setBounds(bounds: RectangleSnapshotOut) {
      self.bounds = bounds
    },
    toggleTranlation() {
      self.translation = !self.translation
    },
    togglePhonetic() {
      self.phonetic = !self.phonetic
    },
    toggleOverlay() {
      self.overlay = !self.overlay
    },
  }))
  // actions on osd lyric process
  .actions((self) => ({
    __LYRIC__PROCESS__Toggle__: self.toggle,
    __LYRIC__PROCESS__ToggleTranslation__: self.toggleTranlation,
    __LYRIC__PROCESS__TogglePhonetic__: self.togglePhonetic,
    __LYRIC__PROCESS__ToggleOverlay__: self.toggleOverlay,
  }))

export const lyric = Lyric.create()
