import c from 'classnames'
import { observer } from 'mobx-react-lite'
import { MouseEventHandler, useCallback } from 'react'

import { Artists } from '@/components'
import { useLiked } from '@/hooks'
import { SongSnapshotIn, usePlayer } from '@/models'
import { isSongAvailable } from '@/stores'

import styles from './Song.module.scss'

export type SongProps = {
  song: SongSnapshotIn
  active: boolean
  onClick: MouseEventHandler
  onDoubleClick?: () => void
}

export const Song: React.VFC<SongProps> = observer(
  ({ song, active, onClick, onDoubleClick }) => {
    const { isCurrSong, tryReplaceSong } = usePlayer()
    const liked = useLiked(song.id)
    const available = isSongAvailable(song.id)

    const handleDoubleClick = useCallback(() => {
      tryReplaceSong(song)
      onDoubleClick?.()
    }, [onDoubleClick, song, tryReplaceSong])

    return (
      <div
        className={c(styles.container, {
          [styles.current]: isCurrSong(song.id),
          [styles.active]: active,
          [styles.liked]: liked,
          [styles.unavailable]: !available,
        })}
        onClick={onClick}
        onDoubleClick={handleDoubleClick}
      >
        <div className={styles.prefix}></div>
        <div className={styles.name}>{song.name}</div>
        <Artists className={styles.artists} song={song} />
      </div>
    )
  },
)

export default Song
