import React from 'react'

import { CloudSearchResponse } from '@/data'

import Artist from './Artist'

export type ArtistResultsProps = { data: CloudSearchResponse }
export const ArtistResults: React.FC<ArtistResultsProps> = ({ data }) => {
  if (!('artists' in data.result)) return null

  return (
    <>
      {data.result.artists?.map((artist) => (
        <Artist artist={artist} />
      ))}
    </>
  )
}

export default ArtistResults
