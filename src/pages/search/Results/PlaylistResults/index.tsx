import React from 'react'

import { Playlist } from '@/components'
import { CloudSearchResponse } from '@/data'

export type PlaylistResultsProps = { data: CloudSearchResponse }
export const PlaylistResults: React.FC<PlaylistResultsProps> = ({ data }) => {
  if (!('playlists' in data.result)) return null

  return (
    <>
      {data.result.playlists?.map((playlist, index) => (
        <Playlist key={index} playlist={playlist} />
      ))}
    </>
  )
}

export default PlaylistResults
