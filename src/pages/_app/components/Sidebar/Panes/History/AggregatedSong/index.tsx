import c from 'classnames'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import { useCallback } from 'react'

import { Authors } from '@/components'
import { usePlayer, AggregatedSong as AggregatedSongType } from '@/models'

import styles from './AggregatedSong.module.scss'

dayjs.extend(duration)

export type AggregatedSongProps = {
  aggregatedSong: AggregatedSongType
  playing?: boolean
}

export const AggregatedSong: React.VFC<AggregatedSongProps> = observer(
  ({ aggregatedSong, playing }) => {
    const player = usePlayer()
    const [historySong] = aggregatedSong.songs

    const handleDoubleClick = useCallback(() => {
      if (playing) return

      const historySongSnapshot = Object.assign({}, getSnapshot(historySong), {
        played: undefined,
      })

      player.replaceTrack({
        song: historySongSnapshot,
        playing: true,
      })
      player.replaceQueue({
        name: '正在播放',
        songs: [historySongSnapshot],
      })
    }, [playing, historySong, player])

    return (
      <div
        className={c(styles.container, { [styles.playing]: playing })}
        onDoubleClick={handleDoubleClick}
      >
        {aggregatedSong.songs.length > 1 && (
          <div className={styles.count}>{aggregatedSong.songs.length}</div>
        )}
        <div className={styles.name}>{historySong.name}</div>
        <Authors className={styles.authors} song={historySong} />
      </div>
    )
  },
)

export default AggregatedSong
