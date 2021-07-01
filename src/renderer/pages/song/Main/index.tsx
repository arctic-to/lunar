import { observer } from 'mobx-react-lite'
import React from 'react'

import { usePlayer } from '@/models'

import { Lyric } from './Lyric'
import styles from './Main.module.scss'

export const Main: React.FC = observer(() => {
  const lyric = usePlayer().track.song?.lyric
  const { parsedLyrics, noTimestamp, raw: data } = lyric ?? {}

  if (data === undefined) return null
  const info = data.nolyric
    ? '纯音乐'
    : data.uncollected
    ? '歌词缺失'
    : parsedLyrics && noTimestamp
    ? '时间戳缺失'
    : undefined

  return (
    <div className={styles.container}>
      {info && <span className={styles.info}>{info}</span>}
      {parsedLyrics && (
        <Lyric parsedLyrics={parsedLyrics} noTimestamp={noTimestamp!} />
      )}
    </div>
  )
})

export default Main
