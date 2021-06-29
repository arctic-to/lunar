import { SongSnapshotIn } from '@/models'

import styles from './Fallback.module.scss'

export type FallbackProps = { song: SongSnapshotIn | undefined }
export const Fallback: React.FC<FallbackProps> = ({ song }) => {
  return (
    <div className={styles.container}>
      {song
        ? `${song.name} - ${song.ar?.map((ar) => ar.name).join(' & ')}`
        : 'No songs in the track.'}
    </div>
  )
}

export default Fallback
