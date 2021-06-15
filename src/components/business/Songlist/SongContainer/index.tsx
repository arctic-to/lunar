import c from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { useMemo, MouseEventHandler, useCallback } from 'react'

import { PrivilegeSnapshotIn, SongSnapshotIn, usePlayer } from '@/models'

import styles from './SongContainer.module.scss'

export type SongContainerProps = {
  index: number
  songs: SongSnapshotIn[]
  privilege: PrivilegeSnapshotIn | undefined
  active: boolean
  onClick: MouseEventHandler
}
export const SongContainer: React.FC<SongContainerProps> = observer(
  ({ index, songs, privilege, active, onClick, children }) => {
    const player = usePlayer()
    const song = useMemo(() => songs[index], [index, songs])

    const handleDoubleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.ctrlKey) {
          player.insertOneToQueue(song)
        } else {
          player.replaceQueue({ songs })
        }
        player.tryReplaceTrack({ song }, { privilege })
      },
      [player, privilege, song, songs],
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
