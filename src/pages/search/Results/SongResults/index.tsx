import React from 'react'

import { Songlist } from '@/components'
import { CloudSearchResponse } from '@/data'

export type SongResultsProps = { data: CloudSearchResponse }
export const SongResults: React.FC<SongResultsProps> = ({ data }) => {
  if (!('songs' in data.result)) return null
  const songs = data.result.songs
  if (!songs) return null

  return (
    <Songlist songs={songs} privileges={songs.map((song) => song.privilege)} />
  )
}

export default SongResults
