import React from 'react'

import { SongSnapshotIn } from '@/models'

import ArtistLink from '../ArtistLink'

export type AuthorsProps = {
  song: SongSnapshotIn
  className?: string
}

export const Authors: React.FC<AuthorsProps> = ({ song, className }) => {
  return (
    <div className={className}>
      {song.ar
        ?.map((artist) => <ArtistLink artist={artist} />)
        .reduce((acc, cur) => {
          return (
            <>
              {acc} / {cur}
            </>
          )
        })}
    </div>
  )
}

export default Authors
