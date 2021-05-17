import React from 'react'

import { CloudSearchLyricResponseSnapshotIn, CloudSearchResponse } from '@/data'
import { useSonglist } from '@/hooks'

import LyricSong from './LyricSong'

export type LyricResultsProps = { data: CloudSearchResponse }
export const LyricResults: React.FC<LyricResultsProps> = ({ data }) => {
  const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()

  if (!('songs' in data.result)) return null

  return (
    <>
      {(data as CloudSearchLyricResponseSnapshotIn).result.songs?.map(
        (lyricSong, index) => (
          <LyricSong
            key={index}
            index={index}
            lyricSong={lyricSong}
            active={activeSongIndexes.includes(index)}
            onClick={resetActiveSongIndexes(index)}
          />
        ),
      )}
    </>
  )
}

export default LyricResults
