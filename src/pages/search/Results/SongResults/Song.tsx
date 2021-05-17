import React, { MouseEventHandler } from 'react'

import { SongBase, SongContainer } from '@/components'
import { SongResultSnapshotIn } from '@/models'

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
  return (
    <SongContainer
      song={song}
      privilege={song.privilege}
      active={active}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <SongBase index={index} song={song} privilege={song.privilege} />
    </SongContainer>
  )
}

export default Song
