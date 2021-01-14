import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useCallback } from 'react'

import { Authors } from '@/components'
import { useStore, SongSnapshot } from '@/models'

import styles from './Song.module.scss'

dayjs.extend(duration)

export type SongProps = {
  song: SongSnapshot
  onDoubleClick: () => void
}

export const Song: React.VFC<SongProps> = ({ song, onDoubleClick }) => {
  const { player } = useStore()
  const handleDoubleClick = useCallback(() => {
    player.replaceTrack({
      song,
      playing: true,
    })
    onDoubleClick()
  }, [onDoubleClick, player, song])

  return (
    <div className={styles.container} onDoubleClick={handleDoubleClick}>
      <div className={styles.name}>{song.name}</div>
      <Authors className={styles.authors} song={song} />
    </div>
  )
}

export default Song