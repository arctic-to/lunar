import c from 'classnames'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'
import { HiLockClosed, HiLockOpen } from 'react-icons/hi'

import Album from '@/components/business/Album'
import Artists from '@/components/business/Artists'
import Like from '@/components/business/Like'
import { ProgressBar } from '@/components/common'
import { SongSnapshotIn, usePlayer } from '@/models'
import { getSongSourceKind, SongSourceKind } from '@/stores'

import styles from './SongBase.module.scss'

export type SongBaseProps = {
  index: number
  song: SongSnapshotIn
}
export const SongBase: React.FC<SongBaseProps> = observer(({ index, song }) => {
  const { isCurrSong } = usePlayer()
  const songSourceKind = getSongSourceKind(song.id)
  const unavailable = songSourceKind === SongSourceKind.None

  const prefixIconMap = useMemo(
    () => ({
      [SongSourceKind.Netease]: <Like songId={song.id} />,
      [SongSourceKind.Unofficial]: <HiLockOpen className={styles.unlock} />,
      [SongSourceKind.None]: <HiLockClosed className={styles.lock} />,
    }),
    [song.id],
  )

  return (
    <div
      className={c(styles.container, {
        [styles.current]: isCurrSong(song.id),
        [styles.unavailable]: unavailable,
      })}
    >
      <span className={styles.index}>{index + 1}</span>
      {prefixIconMap[songSourceKind]}
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
