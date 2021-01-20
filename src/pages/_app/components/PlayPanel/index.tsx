import { observer } from 'mobx-react-lite'

import CentralController from './CentralController'
import Lyric from './Lyric'
import styles from './PlayPanel.module.scss'
import SideController from './SideController'
import SongCard from './SongCard'

export const PlayPanel: React.FC = observer(() => {
  return (
    <div className={styles['play-panel']}>
      <SongCard />
      <CentralController />
      <SideController />

      <Lyric />
    </div>
  )
})

export default PlayPanel
