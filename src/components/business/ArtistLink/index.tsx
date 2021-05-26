import Link from 'next/link'

import { path } from '@/path'

import styles from './ArtistLink.module.scss'

export type ArtistLinkProps = {
  artist: {
    id: number
    name: string
  }
}

export const ArtistLink: React.FC<ArtistLinkProps> = ({ artist }) => {
  return (
    <Link href={path.artist(artist.id)}>
      <span className={styles.author}>{artist.name}</span>
    </Link>
  )
}

export default ArtistLink
