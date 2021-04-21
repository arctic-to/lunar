import c from 'classnames'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { MouseEventHandler, useCallback } from 'react'

import { Authors } from '@/components'
import { usePlaying } from '@/hooks'
import { useStore, SongSnapshot } from '@/models'

import styles from './Song.module.scss'

dayjs.extend(duration)

export type SongProps = {
  song: SongSnapshot
  active: boolean
  onClick: MouseEventHandler
  onDoubleClick: () => void
}

export const Song: React.VFC<SongProps> = ({
  song,
  active,
  onClick,
  onDoubleClick,
}) => {
  const { player } = useStore()
  const playing = usePlaying(song)

  const handleDoubleClick = useCallback(() => {
    player.replaceTrack({
      song,
      playing: true,
    })
    onDoubleClick()
  }, [onDoubleClick, player, song])

  return (
    <div
      className={c(styles.container, {
        [styles.playing]: playing,
        [styles.active]: active,
      })}
      onClick={onClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className={styles.prefix}></div>
      <div className={styles.name}>{song.name}</div>
      <Authors className={styles.authors} song={song} />
    </div>
  )
}

export default Song
