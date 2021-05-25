import c from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { MouseEventHandler, useCallback } from 'react'

import { useReplaceTrack } from '@/hooks'
import { PrivilegeSnapshotIn, SongSnapshotIn } from '@/models'

import styles from './SongContainer.module.scss'

export type SongContainerProps = {
  song: SongSnapshotIn
  privilege: PrivilegeSnapshotIn
  active: boolean
  onClick: MouseEventHandler
  onDoubleClick?: () => void
}
export const SongContainer: React.FC<SongContainerProps> = observer(
  ({ song, privilege, active, onClick, onDoubleClick, children }) => {
    const replaceTrack = useReplaceTrack({ song, privilege })

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
        {children}
      </div>
    )
  },
)

export default SongContainer
