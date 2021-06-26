import React from 'react'

import { Songlist } from '@/components'
import { CloudSearchSongResponseSnapshot, CloudSearchResponse } from '@/data'

export type SongResultsProps = { data: CloudSearchResponse }
export const SongResults: React.FC<SongResultsProps> = ({ data }) => {
  if (!('songs' in data.result)) return null
  const songs = (data as CloudSearchSongResponseSnapshot).result.songs
  if (!songs) return null

  return <Songlist songs={songs} />
}

export default SongResults
