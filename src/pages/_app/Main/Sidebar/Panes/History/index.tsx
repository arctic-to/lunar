import { observer } from 'mobx-react-lite'

import { useSonglist } from '@/hooks'
import { usePlayer } from '@/models'

import { AggregatedSong } from '../../components'

import styles from './History.module.scss'

export const History: React.VFC = observer(() => {
  const { history } = usePlayer()
  const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()

  return (
    <div className={styles.container}>
      {history.aggregatedSongs.map((aggregatedSong, index) => (
        <AggregatedSong
          key={Number(aggregatedSong.songs[0].played)}
          aggregatedSong={aggregatedSong}
          playing={index === history.aggregatedSongs.length - 1}
          active={activeSongIndexes.includes(index)}
          onClick={resetActiveSongIndexes(index)}
        />
      ))}
    </div>
  )
})

export default History
