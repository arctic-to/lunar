import React, { MouseEventHandler } from 'react'

import { SongBase, SongContainer } from '@/components'
import { LyricResultSnapshotIn } from '@/models'

import styles from './LyricSong.module.scss'

export type LyricSongProps = {
  index: number
  lyricSong: LyricResultSnapshotIn
  active: boolean
  onClick: MouseEventHandler
  onDoubleClick?: () => void
}

export const LyricSong: React.FC<LyricSongProps> = ({
  index,
  lyricSong,
  active,
  onClick,
  onDoubleClick,
}) => {
  return (
    <SongContainer
      song={lyricSong}
      privilege={lyricSong.privilege}
      active={active}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      <SongBase
        index={index}
        song={lyricSong}
        privilege={lyricSong.privilege}
      />
      <div className={styles.lyrics}>
        {lyricSong.lyrics?.slice(0, 4).map((lyric) => (
          <div dangerouslySetInnerHTML={{ __html: lyric }} />
        ))}
      </div>
    </SongContainer>
  )
}

export default LyricSong
