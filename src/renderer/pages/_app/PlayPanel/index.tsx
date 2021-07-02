import { observer } from 'mobx-react-lite'

import CentralController from './CentralController'
import styles from './PlayPanel.module.scss'
import SideController from './SideController'
import SongCard from './SongCard'
import { useIpc } from './ipc'
import { useShortcut } from './shortcut'

export const PlayPanel: React.FC = observer(() => {
  useIpc()
  useShortcut()

  return (
    <div className={styles['play-panel']}>
      <SongCard />
      <CentralController />
      <SideController />
    </div>
  )
})

export default PlayPanel
