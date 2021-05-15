import { ArtistResultSnapshotIn } from '@/models'

import styles from './Artist.module.scss'

export type ArtistProps = { artist: ArtistResultSnapshotIn }
export const Artist: React.FC<ArtistProps> = ({ artist }) => {
  const alias = artist.trans || artist.alias?.[0]
  return (
    <div className={styles.container}>
      <img src={artist.img1v1Url} alt="artist image" />
      <span className={styles.name}>{artist.name}</span>
      {alias && <span className={styles.alias}>({alias})</span>}
    </div>
  )
}

export default Artist
