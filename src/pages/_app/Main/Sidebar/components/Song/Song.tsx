import c from 'classnames'
import { observer } from 'mobx-react-lite'
import { MouseEventHandler, useCallback } from 'react'

import { Artists } from '@/components'
import { useLiked } from '@/hooks'
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
    const { isInTrack, tryReplaceTrack } = usePlayer()
    const liked = useLiked(song.id)
    const unavailable = !(privilege?.cp ?? true)

    const handleDoubleClick = useCallback(() => {
      tryReplaceTrack({ song }, { privilege })
      onDoubleClick?.()
    }, [onDoubleClick, privilege, song, tryReplaceTrack])

    return (
      <div
        className={c(styles.container, {
          [styles.in_track]: isInTrack(song),
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
