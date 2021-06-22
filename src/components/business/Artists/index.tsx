import React from 'react'

import { SongSnapshotIn } from '@/models'
import { path } from '@/path'
import { withDivider } from '@/utils'

import { Link } from '../Link'

export type ArtistsProps = {
  song: SongSnapshotIn
  className?: string
}

export const Artists: React.FC<ArtistsProps> = ({ song, className }) => {
  return (
    <div className={className}>
      {withDivider(
        song.ar?.map(({ id, name }) => (
          <Link href={path.artist(id)}>
            <span>{name}</span>
          </Link>
        )),
        '/',
      )}
    </div>
  )
}

export default Artists
