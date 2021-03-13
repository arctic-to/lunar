import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { useCallback, useMemo } from 'react'

import { useRecommedSongs } from '@/data'
import { usePlayer } from '@/models'

import { SidebarComponent } from '../../types'

import styles from './Daily.module.scss'
import Song from './Song'

export const Daily: SidebarComponent = observer(() => {
  const title = useMemo(() => `每日推荐 ${dayjs().format('YYYY-MM-DD')}`, [])

  const player = usePlayer()
  const { data } = useRecommedSongs()
  const dailySongs = useMemo(() => data?.data.dailySongs ?? [], [
    data?.data.dailySongs,
  ])

  const updatePlayQueue = useCallback(() => {
    player.replaceQueue({
      name: title,
      songs: dailySongs,
    })
  }, [dailySongs, player, title])

  return (
    <div className={styles.container}>
      <div className={styles.header}>{title}</div>
      <div className={styles.songs}>
        {dailySongs.map((song) => (
          <Song key={song.id} song={song} onDoubleClick={updatePlayQueue} />
        ))}
      </div>
    </div>
  )
})

Daily.title = 'Daily'

export default Daily
