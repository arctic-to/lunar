import dayjs from 'dayjs'
import { xor } from 'lodash'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useMemo } from 'react'

import { useRecommedSongs, useUserAccount } from '@/data'
import { usePlayer } from '@/models'
import {
  trackNeteaseCloudMusicRecommendedSongs,
  useNeteaseCloudMusicRecommendedSongs,
} from '@/tracking'

import { SidebarComponent } from '../../types'

import styles from './Daily.module.scss'
import Song from './Song'

export const Daily: SidebarComponent = observer(() => {
  const title = useMemo(() => `每日推荐 ${dayjs().format('YYYY-MM-DD')}`, [])

  const player = usePlayer()
  const { data } = useRecommedSongs()
  const { data: userAccountData } = useUserAccount()
  const {
    data: neteaseCloudMusicRecommendedSongsData,
    mutate,
  } = useNeteaseCloudMusicRecommendedSongs()
  const dailySongs = useMemo(() => data?.data.dailySongs ?? [], [
    data?.data.dailySongs,
  ])

  useEffect(() => {
    if (userAccountData?.account && neteaseCloudMusicRecommendedSongsData) {
      const trackedDailySongs = {
        songIds: dailySongs.map((song) => song.id),
        userId: userAccountData.account.id,
      }
      const [
        lastNeteaseCloudMusicRecommendedSongs = undefined,
      ] = neteaseCloudMusicRecommendedSongsData.slice(-1)

      const tracked =
        xor(
          lastNeteaseCloudMusicRecommendedSongs?.songIds,
          trackedDailySongs.songIds,
        ).length === 0

      if (!tracked) {
        mutate(trackNeteaseCloudMusicRecommendedSongs(trackedDailySongs))
      }
    }
  }, [
    dailySongs,
    mutate,
    neteaseCloudMusicRecommendedSongsData,
    userAccountData?.account,
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
