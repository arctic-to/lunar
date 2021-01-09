import { observer } from 'mobx-react-lite'

import { Authors } from '@/components'

import { useCurrentTrack } from '../hooks'

import styles from './SongCard.module.scss'

export const SongCard: React.FC = observer(() => {
  const { song } = useCurrentTrack() ?? {}

  if (!song) return null

  return (
    <div className={styles['song-card']}>
      <img
        className={styles['album-cover']}
        src={song.al.picUrl ?? ''}
        alt="The album cover"
      />

      <div className={styles['song-info']}>
        <div className={styles.name}>{song.name}</div>
        <Authors className={styles.author} song={song} />
      </div>
    </div>
  )
})

export default SongCard
