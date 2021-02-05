import c from 'classnames'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'

import { Authors } from '@/components'
import { usePlayer, SongSnapshot, useCurrentTrack } from '@/models'

import styles from './Song.module.scss'

dayjs.extend(duration)

export type SongProps = {
  song: SongSnapshot
}

export const Song: React.VFC<SongProps> = observer(({ song }) => {
  const player = usePlayer()
  const currentTrack = useCurrentTrack()
  const playing = currentTrack?.song.id === song.id

  const handleDoubleClick = useCallback(() => {
    if (playing) return

    player.replaceTrack({
      song,
      playing: true,
    })
    player.replaceQueue({
      name: '正在播放',
      songs: [song],
    })
  }, [player, playing, song])

  return (
    <div
      className={c(styles.container, { [styles.playing]: playing })}
      onDoubleClick={handleDoubleClick}
    >
      <div className={styles.name}>{song.name}</div>
      <Authors className={styles.authors} song={song} />
    </div>
  )
})

export default Song
