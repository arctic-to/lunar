import React from 'react'

import { AlbumSnapshotIn } from '@/models'
import { path } from '@/path'

import { Link } from '../Link'

export type AlbumProps = {
  album: AlbumSnapshotIn
  className: string
}
export const Album: React.FC<AlbumProps> = ({ album, className }) => {
  return (
    <Link href={path.album(album.id)}>
      <span className={className}>{album.name}</span>
    </Link>
  )
}

export default Album
