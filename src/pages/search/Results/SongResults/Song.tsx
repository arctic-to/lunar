import c from 'classnames'
import dayjs from 'dayjs'
import React, { MouseEventHandler, useCallback } from 'react'

import { Like, Authors, ProgressBar } from '@/components'
import { useReplaceTrack } from '@/hooks'
import { SongResultSnapshotIn } from '@/models'

import styles from './Song.module.scss'

export type SongProps = {
  index: number
  song: SongResultSnapshotIn
  active: boolean
  onClick: MouseEventHandler
  onDoubleClick?: () => void
}
export const Song: React.FC<SongProps> = ({
  index,
  song,
  active,
  onClick,
  onDoubleClick,
}) => {
  const replaceTrack = useReplaceTrack({ song, privilege: song.privilege })

  const handleDoubleClick = useCallback(() => {
    replaceTrack()
    onDoubleClick?.()
  }, [onDoubleClick, replaceTrack])

  return (
    <div
      className={c(styles.container, {
        [styles.active]: active,
      })}
      onClick={onClick}
      onDoubleClick={handleDoubleClick}
    >
      <span className={styles.index}>{index + 1}</span>
      <Like songId={song.id} />
      <span className={styles.name}>{song.name}</span>
      <Authors className={styles.author} song={song} />
      <span className={styles.album}>{song.al.name}</span>
      <span className={styles.duration}>
        {dayjs.duration(song.dt).format('mm:ss')}
      </span>
      <span className={styles.pop}>
        <ProgressBar percentage={song.pop / 100} />
      </span>
    </div>
  )
}

export default Song
