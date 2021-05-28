import { observer } from 'mobx-react-lite'

import { Artists } from '@/components'
import { useCurrentTrack } from '@/models'

import styles from './SongCard.module.scss'

export const SongCard: React.FC = observer(() => {
  const { song } = useCurrentTrack() ?? {}

  return (
    <div className={styles['song-card']}>
      {song && (
        <img
          className={styles['album-cover']}
          src={song.al.picUrl ?? ''}
          alt="The album cover"
        />
      )}

      {song && (
        <div className={styles['song-info']}>
          <div className={styles.name}>{song.name}</div>
          <Artists className={styles.artist} song={song} />
        </div>
      )}
    </div>
  )
})

export default SongCard
