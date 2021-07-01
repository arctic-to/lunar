import { usePlayer } from '@/models'

import styles from './Fallback.module.scss'

export const Fallback: React.FC = () => {
  const { track } = usePlayer()
  return (
    <div className={styles.container}>
      {track.song?.title || 'No songs in the track.'}
    </div>
  )
}

export default Fallback
