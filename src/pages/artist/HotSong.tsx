import React, { MouseEventHandler } from 'react'

import { SongBase, SongContainer } from '@/components'
import { HotSongSnapshotIn } from '@/models'

export type HotSongProps = {
  index: number
  hotSong: HotSongSnapshotIn
  active: boolean
  onClick: MouseEventHandler
  onDoubleClick?: () => void
}

export const HotSong: React.FC<HotSongProps> = ({
  index,
  hotSong,
  active,
  onClick,
  onDoubleClick,
}) => {
  return (
    <SongContainer
      song={hotSong}
      privilege={hotSong.privilege}
      active={active}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <SongBase index={index} song={hotSong} privilege={hotSong.privilege} />
    </SongContainer>
  )
}

export default HotSong
