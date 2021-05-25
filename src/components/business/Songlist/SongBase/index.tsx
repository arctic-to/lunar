import c from 'classnames'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React from 'react'

import Authors from '@/components/business/Authors'
import Like from '@/components/business/Like'
import { ProgressBar } from '@/components/common'
import { usePlaying } from '@/hooks'
import { PrivilegeSnapshotIn, SongSnapshotIn } from '@/models'

import styles from './SongBase.module.scss'

export type SongBaseProps = {
  index: number
  song: SongSnapshotIn
  privilege: PrivilegeSnapshotIn
}
export const SongBase: React.FC<SongBaseProps> = observer(
  ({ index, song, privilege }) => {
    const playing = usePlaying(song)
    const unavailable = !(privilege?.cp ?? true)

    return (
      <div
        className={c(styles.container, {
          [styles.playing]: playing,
          [styles.unavailable]: unavailable,
        })}
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
  },
)

export default SongBase