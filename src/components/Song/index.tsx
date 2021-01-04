import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { useCallback } from 'react'

import { useStore } from '@/models'

import styles from './Song.module.scss'

dayjs.extend(duration)

export type Author = {
  name: string
}

export type Album = {
  name: string
}

export type Song = {
  id: number
  name: string
  ar: Author[]
  al: Album
  dt: number
}

export type SongProps = { song: Song }

export const Song: React.VFC<SongProps> = ({ song }) => {
  const { player } = useStore()
  const handleDoubleClick = useCallback(() => {
    player.replaceTrack({
      songId: song.id,
    })
  }, [player, song.id])

  return (
    <div className={styles.song} onDoubleClick={handleDoubleClick}>
      <div>{song.name}</div>
      <div>{song.ar.map((author) => author.name).join(' / ')}</div>
      <div>{song.al.name}</div>
      <div>{dayjs.duration(song.dt).format('mm:ss')}</div>
    </div>
  )
}

export default Song
