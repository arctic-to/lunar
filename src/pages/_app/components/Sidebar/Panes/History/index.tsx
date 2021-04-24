import { observer } from 'mobx-react-lite'

import { useSonglist } from '@/hooks'
import { useIsCurrShortcut } from '@/hooks'
import { ShortcutEnum, usePlayer } from '@/models'

import { AggregatedSong } from './AggregatedSong'
import styles from './History.module.scss'

export const History: React.VFC = observer(() => {
  const { history } = usePlayer()
  const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()
  const isCurrShortcut = useIsCurrShortcut(ShortcutEnum.History)

  return (
    <div
      className={styles.container}
      style={isCurrShortcut ? undefined : { display: 'none' }}
    >
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
