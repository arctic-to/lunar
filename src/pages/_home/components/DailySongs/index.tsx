import { Song } from '@/components'
import { useDailySongs } from '@/data'

import styles from './DailySongs.module.scss'

export const DailySongs: React.VFC = () => {
  const { data: dailySongsData } = useDailySongs()

  const dailySongs = dailySongsData?.data?.dailySongs

  return (
    <div className={styles['daily-songs']}>
      {dailySongs?.map((song: Song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  )
}

export default DailySongs
