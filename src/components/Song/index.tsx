import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useCallback } from 'react'

import { useStore, SongSnapshot } from '@/models'

import Authors from '../Authors'

import styles from './Song.module.scss'

dayjs.extend(duration)

export type SongProps = { song: SongSnapshot }

export const Song: React.VFC<SongProps> = ({ song }) => {
  const { player } = useStore()
  const handleDoubleClick = useCallback(() => {
    player.replaceTrack({
      song,
      playing: true,
    })
  }, [player, song])

  return (
    <div className={styles.song} onDoubleClick={handleDoubleClick}>
      <div>{song.name}</div>
      <Authors song={song} />
      <div>{song.al.name}</div>
      <div>{dayjs.duration(song.dt).format('mm:ss')}</div>
    </div>
  )
}

export default Song
