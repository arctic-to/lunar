import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'

import { useSonglist } from '@/hooks'
import { usePlayer } from '@/models'

import { SidebarComponent } from '../../types'

import styles from './PlayQueue.module.scss'
import Song from './Song'

export const PlayQueue: SidebarComponent = observer(() => {
  const player = usePlayer()
  const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()

  return (
    <div className={styles.container}>
      <div className={styles.header}>{player.queue.name}</div>
      <div className={styles.songlist}>
        {player.queue.songs.map((song, index) => (
          <Song
            key={song.id}
            song={getSnapshot(song)}
            active={activeSongIndexes.includes(index)}
            onClick={resetActiveSongIndexes(index)}
          />
        ))}
      </div>
    </div>
  )
})

PlayQueue.title = 'PlayQueue'

export default PlayQueue
