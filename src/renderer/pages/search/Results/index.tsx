import React from 'react'

import { CloudSearchResponse, SearchTypeEnum } from '@/data'

import ArtistResults from './ArtistResults'
import LyricResults from './LyricResults'
import PlaylistResults from './PlaylistResults'
import styles from './Results.module.scss'
import SongResults from './SongResults'
import UserResults from './UserResults'

export type ResultsProps = {
  type: SearchTypeEnum
  data: CloudSearchResponse | undefined
}

const componentMap = {
  [SearchTypeEnum.Song]: SongResults,
  [SearchTypeEnum.Artist]: ArtistResults,
  [SearchTypeEnum.Playlist]: PlaylistResults,
  [SearchTypeEnum.User]: UserResults,
  [SearchTypeEnum.Lyric]: LyricResults,
  [SearchTypeEnum.Album]: null,
  [SearchTypeEnum.MV]: null,
}

export const Results: React.VFC<ResultsProps> = ({ type, data }) => {
  if (!data) return null

  const _Results = componentMap[type]
  if (!_Results) return null

  return (
    <div className={styles.container}>
      <_Results data={data} />
    </div>
  )
}

export default Results
