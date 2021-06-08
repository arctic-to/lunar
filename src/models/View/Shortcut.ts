import { types } from 'mobx-state-tree'

export enum ShortcutEnum {
  PlayQueue = 'PlayQueue',
  History = 'History',
  Daily = 'Daily',
}

export const Shortcut = types
  .model('Shortcut', {
    type: types.enumeration('Type', Object.values(ShortcutEnum)),
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

export const shortcuts = Object.values(ShortcutEnum).map((shortcutType) =>
  Shortcut.create({ type: shortcutType }),
)
