import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'

import { useSongDetail } from '@/data'
import { useSonglist } from '@/hooks'
import { usePlayer } from '@/models'

import { AggregatedSong } from '../../components'

import styles from './History.module.scss'

let inited = false

export const History: React.VFC = observer(() => {
  const { history } = usePlayer()
  const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()

  // Load privileges when app starts
  const songIds = useMemo(() => {
    if (!inited) {
      inited = true
      return history.aggregatedSongs.map(({ songSnapshot }) => songSnapshot.id)
    }
  }, [history.aggregatedSongs])
  useSongDetail(songIds)

  return (
    <div className={styles.container}>
      {history.aggregatedSongs.map((aggregatedSong, index) => (
        <AggregatedSong
          key={Number(aggregatedSong.songs[0].playedAt)}
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
