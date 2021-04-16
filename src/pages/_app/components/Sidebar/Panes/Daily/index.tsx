import c from 'classnames'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { useCallback, useMemo } from 'react'
import { useState } from 'react'
import { CgCalendar } from 'react-icons/cg'
import { useToggle } from 'react-use'

import DatePicker from '@/components/DatePicker'
import { useSongDetail } from '@/data'
import { usePlayer } from '@/models'
import { useNeteaseCloudMusicRecommendedSongs } from '@/tracking'

import { SidebarComponent } from '../../types'

import styles from './Daily.module.scss'
import Song from './Song'

export const Daily: SidebarComponent = observer(() => {
  const [date, setDate] = useState(dayjs())
  const [datePickerActive, toggleDatePickerActive] = useToggle(false)
  const title = `每日推荐 ${date.format('YYYY-MM-DD')}`

  const player = usePlayer()
  const { data } = useNeteaseCloudMusicRecommendedSongs()
  const dailySongIds = useMemo(
    () => data?.find((item) => date.isSame(item.createdAt, 'date'))?.songIds,
    [data, date],
  )
  const songDetail = useSongDetail(dailySongIds)
  const dailySongs = useMemo(() => songDetail.data?.songs, [
    songDetail.data?.songs,
  ])

  const handleChange = useCallback(
    (date: dayjs.Dayjs) => {
      setDate(date)
      toggleDatePickerActive(false)
    },
    [toggleDatePickerActive],
  )

  const updatePlayQueue = useCallback(() => {
    player.replaceQueue({
      name: title,
      songs: dailySongs,
    })
  }, [dailySongs, player, title])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>{title}</div>
        <div className={styles.right}>
          <CgCalendar
            className={c({ [styles.active]: datePickerActive })}
            onClick={toggleDatePickerActive}
          />
        </div>
      </div>

      <div className={styles.songs}>
        {datePickerActive && <DatePicker date={date} onChange={handleChange} />}
        {dailySongs?.map((song) => (
          <Song key={song.id} song={song} onDoubleClick={updatePlayQueue} />
        ))}
      </div>
    </div>
  )
})

Daily.title = 'Daily'

export default Daily
