import { observer } from 'mobx-react-lite'
import React from 'react'

import { ShortcutEnum, useView } from '@/models'

import { Playlists, PlayQueue, History, Daily } from './Panes'
import styles from './Sidebar.module.scss'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SidebarProps {}

const shortcutMap = {
  [ShortcutEnum.PlayQueue]: PlayQueue,
  [ShortcutEnum.Playlists]: Playlists,
  [ShortcutEnum.History]: History,
  [ShortcutEnum.Daily]: Daily,
}

export const Sidebar = observer<SidebarProps, HTMLDivElement>(
  (_, ref) => {
    const view = useView()

    if (!view.currShortcut) return null

    const Component = shortcutMap[view.currShortcut.type]
    const title = view.currShortcut.type

    return (
      <div
        className={styles.container}
        style={{ width: view.sidebar.width }}
        ref={ref}
      >
        <div className={styles.title}>{title}</div>
        <Component />
      </div>
    )
  },
  { forwardRef: true },
)

export default Sidebar
