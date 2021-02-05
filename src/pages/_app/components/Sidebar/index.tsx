import { observer } from 'mobx-react-lite'

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

export const Sidebar: React.VFC = observer(() => {
  const view = useView()

  if (!view.currShortcut) return null

  const Component = shortcutMap[view.currShortcut.type]
  const title = Component.title

  return (
    <div className={styles.container}>
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
})

export default Sidebar
