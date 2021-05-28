import React from 'react'

import { SongSnapshotIn } from '@/models'
import { path } from '@/path'

import { Link } from '../Link'

export type ArtistsProps = {
  song: SongSnapshotIn
  className?: string
}

export const Artists: React.FC<ArtistsProps> = ({ song, className }) => {
  return (
    <div className={className}>
      {song.ar
        ?.map(({ id, name }) => (
          <Link href={path.artist(id)}>
            <span>{name}</span>
          </Link>
        ))
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

export default Artists
