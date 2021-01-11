import { Song } from '@/components'
import { useRecommedSongs } from '@/data'

import styles from './DailySongs.module.scss'

export const DailySongs: React.VFC = () => {
  const { data: dailySongsData } = useRecommedSongs()

  const dailySongs = dailySongsData?.data?.dailySongs

  return (
    <div className={styles['daily-songs']}>
      {dailySongs?.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  )
}

export default DailySongs
