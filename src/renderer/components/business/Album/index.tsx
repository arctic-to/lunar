import React from 'react'

import { AlbumSnapshotIn } from '@/models'
import { path } from '@/path'

import { Link } from '../Link'

export type AlbumProps = {
  album: AlbumSnapshotIn
  className?: string
}
export const Album: React.FC<AlbumProps> = ({ album, className }) => {
  return (
    <div className={className}>
      <Link href={path.album(album.id)}>
        <span>{album.name}</span>
      </Link>
    </div>
  )
}

export default Album
