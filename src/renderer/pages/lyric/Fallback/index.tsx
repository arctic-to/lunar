import { useLyricStore } from '../store'

import styles from './Fallback.module.scss'

export const Fallback: React.FC = () => {
  const { song } = useLyricStore()
  return (
    <div className={styles.container}>
      {song?.title || 'No songs in the track.'}
    </div>
  )
}

export default Fallback
