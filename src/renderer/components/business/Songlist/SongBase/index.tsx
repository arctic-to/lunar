import c from 'classnames'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React from 'react'

import Album from '@/components/business/Album'
import Artists from '@/components/business/Artists'
import Like from '@/components/business/Like'
import { ProgressBar } from '@/components/common'
import { SongSnapshotIn, usePlayer } from '@/models'
import { isSongAvailable } from '@/stores'

import styles from './SongBase.module.scss'

export type SongBaseProps = {
  index: number
  song: SongSnapshotIn
}
export const SongBase: React.FC<SongBaseProps> = observer(({ index, song }) => {
  const { isInTrack } = usePlayer()
  const available = isSongAvailable(song)

  return (
    <div
      className={c(styles.container, {
        [styles.in_track]: isInTrack(song),
        [styles.unavailable]: !available,
      })}
    >
      <span className={styles.index}>{index + 1}</span>
      <Like songId={song.id} />
      <span className={styles.name}>{song.name}</span>
      <Artists className={styles.artist} song={song} />
      <Album className={styles.album} album={song.al} />
      <span className={styles.duration}>
        {dayjs.duration(song.dt).format('mm:ss')}
      </span>
      <span className={styles.pop}>
        <ProgressBar percentage={song.pop / 100} />
      </span>
    </div>
  )
})

export default SongBase
