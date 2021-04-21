import c from 'classnames'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { observer } from 'mobx-react-lite'
import { MouseEventHandler, useCallback } from 'react'

import { Authors } from '@/components'
import { useLiked, usePlaying } from '@/hooks'
import { usePlayer, SongSnapshot } from '@/models'

import styles from './Song.module.scss'

dayjs.extend(duration)

export type SongProps = {
  song: SongSnapshot
  active: boolean
  onClick: MouseEventHandler
  onDoubleClick: () => void
}

export const Song: React.VFC<SongProps> = observer(
  ({ song, active, onClick, onDoubleClick }) => {
    const liked = useLiked(song.id)
    const player = usePlayer()
    const playing = usePlaying(song)

    const handleDoubleClick = useCallback(() => {
      if (playing) return

      player.replaceTrack({
        song,
        playing: true,
      })
      onDoubleClick()
    }, [onDoubleClick, player, playing, song])

    return (
      <div
        className={c(styles.container, {
          [styles.playing]: playing,
          [styles.active]: active,
          [styles.liked]: liked,
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
