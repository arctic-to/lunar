import { observer } from 'mobx-react-lite'

import { usePlayer } from '@/models'

import { SidebarComponent } from '../../types'

import { AggregatedSong } from './AggregatedSong'
import styles from './History.module.scss'

export const History: SidebarComponent = observer(() => {
  const { history } = usePlayer()

  return (
    <div className={styles.container}>
      {history.aggregatedSongs.map((aggregatedSong, index) => (
        <AggregatedSong
          key={Number(aggregatedSong.songs[0].played)}
          aggregatedSong={aggregatedSong}
          playing={index === history.aggregatedSongs.length - 1}
        />
      ))}
    </div>
  )
})

History.title = 'History'

export default History
