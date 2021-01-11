import { observer } from 'mobx-react-lite'

import { useView, ShortcutEnum } from '@/models'

import PaneContainer from './PaneContainer'
import Playlists from './Playlists'
import styles from './Sidebar.module.scss'
import { isSidebarComponentWithPanes } from './types'

const shortcutMap = {
  [ShortcutEnum.PlayQueue]: Playlists,
  [ShortcutEnum.Playlists]: Playlists,
  [ShortcutEnum.Search]: Playlists,
}

export const Sidebar: React.VFC = observer(() => {
  const view = useView()

  if (!view.currShortcut) return null

  const Component = shortcutMap[view.currShortcut.type]
  const title = Component.name

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {isSidebarComponentWithPanes(Component) ? (
        <div className={styles.panes}>
          {Component.Panes.map((Pane) => (
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
