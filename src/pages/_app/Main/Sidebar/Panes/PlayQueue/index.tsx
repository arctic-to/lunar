import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'

import { useSonglist } from '@/hooks'
import { usePlayer } from '@/models'

import { Song } from '../../components'

import styles from './PlayQueue.module.scss'

export const PlayQueue: React.VFC = observer(() => {
  const { queue } = usePlayer()
  const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()

  return (
    <div className={styles.container}>
      <div className={styles.header}>正在播放 ({queue.songs.length})</div>
      <div className={styles.songlist}>
        {queue.songs.map((song, index) => (
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

export default PlayQueue
