import React from 'react'

import { CloudSearchResponse } from '@/data'
import { useSonglist } from '@/hooks'

import { Song } from './Song'
import styles from './SongResults.module.scss'

export type SongResultsProps = { data: CloudSearchResponse }
export const SongResults: React.FC<SongResultsProps> = ({ data }) => {
  const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()

  if (!('songs' in data.result)) return null

  return (
    <div className={styles.container}>
      {data.result.songs?.map((song, index) => (
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

export default SongResults
