import c from 'classnames'
import Link from 'next/link'
import React from 'react'

import { AlbumSnapshotIn } from '@/models'
import { path } from '@/path'

import styles from './Album.module.scss'

export type AlbumProps = {
  album: AlbumSnapshotIn
  className: string
}
export const Album: React.FC<AlbumProps> = ({ album, className }) => {
  return (
    <Link href={path.album(album.id)}>
      <span className={c(className, styles.container)}>{album.name}</span>
    </Link>
  )
}

export default Album
