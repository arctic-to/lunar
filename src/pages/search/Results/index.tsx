import React from 'react'

import { CloudSearchResponse, SearchTypeEnum } from '@/data'

import ArtistResults from './ArtistResults'
import LyricResults from './LyricResults'
import PlaylistResults from './PlaylistResults'
import SongResults from './SongResults'
import UserResults from './UserResults'

export type ResultsProps = {
  type: SearchTypeEnum
  data: CloudSearchResponse | undefined
}

export const Results: React.VFC<ResultsProps> = ({ type, data }) => {
  if (!data) return null

  switch (type) {
    case SearchTypeEnum.Song: {
      return <SongResults data={data} />
    }
    case SearchTypeEnum.Artist: {
      return <ArtistResults data={data} />
    }
    case SearchTypeEnum.Playlist: {
      return <PlaylistResults data={data} />
    }
    case SearchTypeEnum.User: {
      return <UserResults data={data} />
    }
    case SearchTypeEnum.Lyric: {
      return <LyricResults data={data} />
    }
    default: {
      return null
    }
  }
}

export default Results
