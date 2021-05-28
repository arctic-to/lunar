import React from 'react'

import { Link } from '@/components'
import { ArtistResultSnapshotIn } from '@/models'
import { path } from '@/path'

import styles from './Artist.module.scss'

export type ArtistProps = { artist: ArtistResultSnapshotIn }
export const Artist: React.FC<ArtistProps> = ({ artist }) => {
  const alias = artist.trans || artist.alias?.[0]
  return (
    <div className={styles.container}>
      <Link href={path.artist(artist.id)}>
        <img src={artist.img1v1Url} alt="artist image" />
      </Link>

      <Link href={path.artist(artist.id)}>
        <span className={styles.name}>{artist.name}</span>
      </Link>

      {alias && <span className={styles.alias}>({alias})</span>}
    </div>
  )
}

export default Artist
