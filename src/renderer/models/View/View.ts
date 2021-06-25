import { castToSnapshot, types } from 'mobx-state-tree'

import { Shortcut, ShortcutEnum, shortcuts } from './Shortcut'
import { Sidebar, sidebar } from './Sidebar'

export const View = types
  .model('View', {
    shortcuts: types.array(Shortcut),
    sidebar: Sidebar,
  })
  .views((self) => ({
    get currShortcut() {
      return self.shortcuts.find((shortcut) => shortcut.active)
    },
    findShortcut(shortcutType: ShortcutEnum) {
      return self.shortcuts.find((shortcut) => shortcut.type === shortcutType)
    },
  }))
  .actions((self) => ({
    switchShortcut(shortcutType: ShortcutEnum) {
      const currShortcut = self.currShortcut
      const nextShortcut = self.findShortcut(shortcutType)
      currShortcut?.close()
      if (nextShortcut !== currShortcut) nextShortcut?.open()
    },
  }))

export const view = View.create({
  shortcuts,
  sidebar: castToSnapshot(sidebar),
})
