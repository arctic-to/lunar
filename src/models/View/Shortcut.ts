import { types } from 'mobx-state-tree'

export enum ShortcutEnum {
  PlayQueue,
  Playlists,
  Search,
}

export const shortcutTypes = Object.values(ShortcutEnum).filter(
  (v) => typeof v === 'number',
) as ShortcutEnum[]

export const Shortcut = types
  .model('Shortcut', {
    type: types.number,
    active: false,
  })
  .actions((self) => ({
    open() {
      self.active = true
    },
    close() {
      self.active = false
    },
  }))

export const shortcuts = shortcutTypes.map((shortcutType) =>
  Shortcut.create({ type: shortcutType }),
)
