import c from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { useMemo, MouseEventHandler, useCallback } from 'react'

import { SongSnapshotIn, usePlayer } from '@/models'

import styles from './SongContainer.module.scss'

export type SongContainerProps = {
  index: number
  songs: SongSnapshotIn[]
  active: boolean
  onClick: MouseEventHandler
}
export const SongContainer: React.FC<SongContainerProps> = observer(
  ({ index, songs, active, onClick, children }) => {
    const player = usePlayer()
    const song = useMemo(() => songs[index], [index, songs])

    const handleDoubleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.ctrlKey) {
          player.insertOneToQueue(song)
        } else {
          player.replaceQueue({ songIds: songs.map((song) => song.id) })
        }
        player.tryReplaceSong(song)
      },
      [player, song, songs],
    )

    return (
      <div
        className={c(styles.container, {
          [styles.active]: active,
        })}
        onClick={onClick}
        onDoubleClick={handleDoubleClick}
      >
        {children}
      </div>
    )
  },
)

export default SongContainer
