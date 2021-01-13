import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'

import { usePlayer } from '@/models'

import { SidebarComponent } from '../../types'

import styles from './PlayQueue.module.scss'
import Song from './Song'

export const PlayQueue: SidebarComponent = observer(() => {
  const player = usePlayer()
  return (
    <div className={styles.container}>
      {player.queue.map((song) => (
        <Song key={song.id} song={getSnapshot(song)} />
      ))}
    </div>
  )
})

PlayQueue.title = 'PlayQueue'

export default PlayQueue
