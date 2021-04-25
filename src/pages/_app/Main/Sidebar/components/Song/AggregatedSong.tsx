import c from 'classnames'
import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import { MouseEventHandler, useCallback } from 'react'

import { Authors } from '@/components'
import { useLiked } from '@/hooks'
import { usePlayer, AggregatedSong as AggregatedSongType } from '@/models'

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
    const unavailable = historySong.noCopyrightRcmd
    const count = aggregatedSong.songs.length

    const handleDoubleClick = useCallback(() => {
      if (playing) return
      if (unavailable) return

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
    }, [playing, unavailable, historySong, player])

    return (
      <div
        className={c(styles.container, {
          [styles.playing]: playing,
          [styles.active]: active,
          [styles.liked]: liked,
          [styles.unavailable]: unavailable,
        })}
        onClick={onClick}
        onDoubleClick={handleDoubleClick}
      >
        <div className={styles.prefix}>
          {count > 1 && <div className={prefixStyles.count}>{count}</div>}
        </div>
        <div className={styles.name}>{historySong.name}</div>
        <Authors className={styles.authors} song={historySong} />
      </div>
    )
  },
)

export default AggregatedSong
