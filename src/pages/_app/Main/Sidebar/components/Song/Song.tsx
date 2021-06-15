import c from 'classnames'
import { observer } from 'mobx-react-lite'
import { MouseEventHandler, useCallback } from 'react'

import { Artists } from '@/components'
import { useLiked, usePlaying } from '@/hooks'
import { SongSnapshotIn, usePlayer } from '@/models'
import { PrivilegeSnapshotIn } from '@/models'

import styles from './Song.module.scss'

export type SongProps = {
  song: SongSnapshotIn
  privilege?: PrivilegeSnapshotIn
  active: boolean
  onClick: MouseEventHandler
  onDoubleClick?: () => void
}

export const Song: React.VFC<SongProps> = observer(
  ({ song, privilege, active, onClick, onDoubleClick }) => {
    const player = usePlayer()
    const liked = useLiked(song.id)
    const playing = usePlaying(song)
    const unavailable = !(privilege?.cp ?? true)

    const handleDoubleClick = useCallback(() => {
      player.tryReplaceTrack({ song }, { privilege })
      onDoubleClick?.()
    }, [onDoubleClick, player, privilege, song])

    return (
      <div
        className={c(styles.container, {
          [styles.playing]: playing,
          [styles.active]: active,
          [styles.liked]: liked,
          [styles.unavailable]: unavailable,
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
