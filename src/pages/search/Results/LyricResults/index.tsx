import React from 'react'

import { Songlist } from '@/components'
import { CloudSearchLyricResponseSnapshot, CloudSearchResponse } from '@/data'

import styles from './LyricResults.module.scss'

export type LyricResultsProps = { data: CloudSearchResponse }
export const LyricResults: React.FC<LyricResultsProps> = ({ data }) => {
  if (!('songs' in data.result)) return null
  const lyricSongs = (data as CloudSearchLyricResponseSnapshot).result.songs
  if (!lyricSongs) return null

  return (
    <Songlist
      songs={lyricSongs}
      getExtraContent={(lyricSong) => (
        <div className={styles.lyrics}>
          {lyricSong.lyrics?.slice(0, 4).map((lyric) => (
            <div dangerouslySetInnerHTML={{ __html: lyric }} />
          ))}
        </div>
      )}
    />
  )
}

export default LyricResults
