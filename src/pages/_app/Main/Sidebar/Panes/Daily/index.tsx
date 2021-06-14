import c from 'classnames'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { useCallback, useMemo } from 'react'
import { useState } from 'react'
import { CgCalendar, CgCalendarToday } from 'react-icons/cg'
import { useToggle } from 'react-use'

import { DatePicker } from '@/components'
import {
  useNeteaseCloudMusicRecommendedSongs,
  useRecommedSongs,
  useSongDetail,
} from '@/data'
import { useBoolean, useSonglist } from '@/hooks'
import { usePlayer } from '@/models'

import { Song } from '../../components'

import styles from './Daily.module.scss'

export const Daily: React.VFC = observer(() => {
  const [isLatest, setIsLatestToTrue, setIsLatestToFalse] = useBoolean(true)
  const [date, setDate] = useState(dayjs())
  const [datePickerActive, toggleDatePickerActive] = useToggle(false)
  const title = isLatest ? '每日推荐' : `每日推荐 ${date.format('YYYY-MM-DD')}`

  const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()
  const player = usePlayer()

  const { data } = useNeteaseCloudMusicRecommendedSongs()
  const dailySongIds = useMemo(
    () => data?.find((item) => date.isSame(item.createdAt, 'date'))?.songIds,
    [data, date],
  )
  const songDetail = useSongDetail(dailySongIds)
  const specificDailySongs = useMemo(
    () => songDetail.data?.songs,
    [songDetail.data?.songs],
  )

  const latestDailySongs = useRecommedSongs().data?.data.dailySongs

  const dailySongs = useMemo(
    () => (isLatest ? latestDailySongs : specificDailySongs),
    [isLatest, latestDailySongs, specificDailySongs],
  )
  const privileges = useMemo(() => {
    return isLatest
      ? latestDailySongs?.map((dailySong) => dailySong.privilege)
      : songDetail.data?.privileges
  }, [isLatest, latestDailySongs, songDetail.data?.privileges])

  const updatePlayQueue = useCallback(() => {
    player.replaceQueue({
      name: title,
      songs: dailySongs,
    })
  }, [dailySongs, player, title])

  const handleChange = useCallback(
    (date: dayjs.Dayjs) => {
      setDate(date)
      toggleDatePickerActive(false)
      setIsLatestToFalse()
    },
    [setIsLatestToFalse, toggleDatePickerActive],
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>{title}</div>
        <div className={styles.buttons}>
          <CgCalendar
            className={c({ [styles.active]: datePickerActive })}
            onClick={toggleDatePickerActive}
          />
          <CgCalendarToday
            className={c({ [styles.active]: isLatest })}
            onClick={setIsLatestToTrue}
          />
        </div>
      </div>

      <div className={styles.songlist}>
        {datePickerActive && (
          <DatePicker
            className={styles.date_picker}
            date={date}
            onChange={handleChange}
          />
        )}

        {dailySongs?.map((song, index) => (
          <Song
            key={song.id}
            song={song}
            privilege={privileges?.[index]}
            active={activeSongIndexes.includes(index)}
            onClick={resetActiveSongIndexes(index)}
            onDoubleClick={updatePlayQueue}
          />
        ))}
      </div>
    </div>
  )
})

export default Daily
