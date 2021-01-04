import { observer } from 'mobx-react-lite'

import { useStore } from '@/models'

import styles from './PlayPanel.module.scss'

export const PlayPanel: React.FC = observer(() => {
  const { player } = useStore()
  const [currentSong] = player.tracks

  return (
    <div className={styles['play-panel']}>
      <audio controls src={currentSong?.songUrl} autoPlay />
    </div>
  )
})

export default PlayPanel
