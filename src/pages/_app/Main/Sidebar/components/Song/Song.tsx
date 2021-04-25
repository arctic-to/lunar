import c from 'classnames'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { observer } from 'mobx-react-lite'
import { MouseEventHandler, useCallback } from 'react'

import { Authors } from '@/components'
import { useLiked, usePlaying } from '@/hooks'
import { usePlayer, SongSnapshot } from '@/models'
import { PrivilegeSnapshot } from '@/models/Platform/Netease'

import styles from './Song.module.scss'

dayjs.extend(duration)

export type SongProps = {
  song: SongSnapshot
  privilege?: PrivilegeSnapshot
  active: boolean
  onClick: MouseEventHandler
  onDoubleClick?: () => void
}

export const Song: React.VFC<SongProps> = observer(
  ({ song, privilege, active, onClick, onDoubleClick }) => {
    const liked = useLiked(song.id)
    const player = usePlayer()
    const playing = usePlaying(song)
    const unavailable = !(privilege?.cp ?? true)

    const handleDoubleClick = useCallback(() => {
      if (playing) return
      if (unavailable) return

      player.replaceTrack({
        song,
        playing: true,
      })
      onDoubleClick?.()
    }, [onDoubleClick, player, playing, song, unavailable])

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
        <Authors className={styles.authors} song={song} />
      </div>
    )
  },
)

export default Song
