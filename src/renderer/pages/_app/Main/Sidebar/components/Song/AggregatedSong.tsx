import c from 'classnames'
import { observer } from 'mobx-react-lite'
import { MouseEventHandler, useCallback } from 'react'

import { Artists } from '@/components'
import { useLiked } from '@/hooks'
import { usePlayer, AggregatedSong as AggregatedSongType } from '@/models'
import { isSongAvailable } from '@/stores'

import prefixStyles from './AggregatedSong.module.scss'
import styles from './Song.module.scss'

export type AggregatedSongProps = {
  aggregatedSong: AggregatedSongType
  playing: boolean
  active: boolean
  onClick: MouseEventHandler
}

export const AggregatedSong: React.VFC<AggregatedSongProps> = observer(
  ({ aggregatedSong, playing, active, onClick }) => {
    const player = usePlayer()
    const [historySong] = aggregatedSong.songs
    const liked = useLiked(historySong.id)
    const available = isSongAvailable(historySong)
    const count = aggregatedSong.songs.length

    const handleDoubleClick = useCallback(() => {
      player.insertOneToQueue(aggregatedSong.songSnapshot)
      player.tryReplaceSong(aggregatedSong.songSnapshot)
    }, [player, aggregatedSong.songSnapshot])

    return (
      <div
        className={c(styles.container, {
          [styles.playing]: playing,
          [styles.active]: active,
          [styles.liked]: liked,
          [styles.unavailable]: !available,
        })}
        onClick={onClick}
        onDoubleClick={handleDoubleClick}
      >
        <div className={styles.prefix}>
          {count > 1 && <div className={prefixStyles.count}>{count}</div>}
        </div>
        <div className={styles.name}>{historySong.name}</div>
        <Artists className={styles.artists} song={historySong} />
      </div>
    )
  },
)

export default AggregatedSong
