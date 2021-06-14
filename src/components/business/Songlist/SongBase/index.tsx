import c from 'classnames'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React from 'react'

import Album from '@/components/business/Album'
import Artists from '@/components/business/Artists'
import Like from '@/components/business/Like'
import { ProgressBar } from '@/components/common'
import { usePlaying } from '@/hooks'
import { PrivilegeSnapshotIn, SongSnapshotIn } from '@/models'

import styles from './SongBase.module.scss'
import TagInput from './TagInput'

export type SongBaseProps = {
  index: number
  song: SongSnapshotIn
  privilege: PrivilegeSnapshotIn | undefined
}
export const SongBase: React.FC<SongBaseProps> = observer(
  ({ index, song, privilege }) => {
    const playing = usePlaying(song)
    const unavailable = !(privilege?.cp ?? true)

    return (
      <div className={styles.container}>
        <div
          className={c(styles.top, {
            [styles.playing]: playing,
            [styles.unavailable]: unavailable,
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

        <div className={styles.bottom}>
          <TagInput song={song} />
        </div>
      </div>
    )
  },
)

export default SongBase
