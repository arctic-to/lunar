import { observer } from 'mobx-react-lite'
import React from 'react'

import { useView } from '@/models'

import { Playlists, PlayQueue, History, Daily } from './Panes'
import styles from './Sidebar.module.scss'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SidebarProps {}

export const Sidebar = observer<SidebarProps, HTMLDivElement>(
  (_, ref) => {
    const view = useView()

    if (!view.currShortcut) return null

    const title = view.currShortcut.type

    return (
      <div className={styles.container} ref={ref}>
        <div className={styles.title}>{title?.toUpperCase()}</div>
        <PlayQueue />
        <Playlists />
        <History />
        <Daily />
      </div>
    )
  },
  { forwardRef: true },
)

export default Sidebar
