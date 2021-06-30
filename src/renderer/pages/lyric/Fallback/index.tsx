import { usePlayer } from '@/models'

import styles from './Fallback.module.scss'

export const Fallback: React.FC = () => {
  const { currTrack } = usePlayer()
  return (
    <div className={styles.container}>
      {currTrack?.songTitle || 'No songs in the track.'}
    </div>
  )
}

export default Fallback
