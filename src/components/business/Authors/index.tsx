import React from 'react'

import { SongSnapshotIn } from '@/models'
import { path } from '@/path'

import { Link } from '../Link'

export type AuthorsProps = {
  song: SongSnapshotIn
  className?: string
}

export const Authors: React.FC<AuthorsProps> = ({ song, className }) => {
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

export default Authors
