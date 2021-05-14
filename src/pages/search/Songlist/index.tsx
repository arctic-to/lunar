import React from 'react'

import { useSonglist } from '@/hooks'
import { SongResultSnapshotIn } from '@/models'

import { Song } from './Song'
import styles from './Songlist.module.scss'

export type SonglistProps = { songs: SongResultSnapshotIn[] | undefined }
export const Songlist: React.FC<SonglistProps> = ({ songs }) => {
  const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()

  return (
    <div className={styles.container}>
      {songs?.map((song, index) => (
        <Song
          key={index}
          index={index}
          song={song}
          active={activeSongIndexes.includes(index)}
          onClick={resetActiveSongIndexes(index)}
        />
      ))}
    </div>
  )
}

export default Songlist
