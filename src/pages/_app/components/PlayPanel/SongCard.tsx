import { observer } from 'mobx-react-lite'

import { Authors } from '@/components'

import styles from './SongCard.module.scss'
import { useCurrentTrack } from './hooks'

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
        <div>{song.name}</div>
        <Authors song={song} />
      </div>
    </div>
  )
})

export default SongCard
