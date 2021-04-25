import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'

import { useSonglist } from '@/hooks'
import { useIsCurrShortcut } from '@/hooks'
import { ShortcutEnum, usePlayer } from '@/models'

import { Song } from '../../components'

import styles from './PlayQueue.module.scss'

export const PlayQueue: React.VFC = observer(() => {
  const player = usePlayer()
  const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()
  const isCurrShortcut = useIsCurrShortcut(ShortcutEnum.PlayQueue)

  return (
    <div
      className={styles.container}
      style={isCurrShortcut ? undefined : { display: 'none' }}
    >
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

export default PlayQueue
