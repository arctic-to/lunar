import { observer } from 'mobx-react-lite'
import React from 'react'

import { useView, ShortcutEnum } from '@/models'

import PaneContainer from './PaneContainer'
import { Playlists, PlayQueue, History, Daily, Search } from './Panes'
import styles from './Sidebar.module.scss'
import { isSidebarComponentWithPanes } from './types'

const shortcutMap = {
  [ShortcutEnum.PlayQueue]: PlayQueue,
  [ShortcutEnum.Playlists]: Playlists,
  [ShortcutEnum.History]: History,
  [ShortcutEnum.Search]: Search,
  [ShortcutEnum.Daily]: Daily,
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SidebarProps {}

export const Sidebar = observer<SidebarProps, HTMLDivElement>(
  (_, ref) => {
    const view = useView()

    if (!view.currShortcut) return null

    const Component = shortcutMap[view.currShortcut.type]
    const title = Component.title

    return (
      <div className={styles.container} ref={ref}>
        <div className={styles.title}>{title?.toUpperCase()}</div>
        {isSidebarComponentWithPanes(Component) ? (
          <div className={styles.panes}>
            {Component.Panes?.map((Pane) => (
              <PaneContainer key={Pane.title} Pane={Pane} />
            ))}
          </div>
        ) : (
          <Component />
        )}
      </div>
    )
  },
  { forwardRef: true },
)

export default Sidebar
