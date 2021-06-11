import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'

import { useLyric } from '@/data'
import { useCurrentTrack } from '@/models'
import { parseLyric } from '@/utils'

import { Lyric } from './Lyric'
import styles from './Main.module.scss'

export const Main: React.FC = observer(() => {
  const { song } = useCurrentTrack() ?? {}
  const { data } = useLyric(song?.id)

  const result = useMemo(() => {
    if (data && !data.nolyric && !data.uncollected) return parseLyric(data)
  }, [data])

  const { parsedLyric, noTimestamp } = result || {}

  if (data === undefined) return null
  const info = data.nolyric
    ? '纯音乐'
    : data.uncollected
    ? '歌词缺失'
    : parsedLyric && noTimestamp
    ? '时间戳缺失'
    : undefined

  return (
    <div className={styles.container}>
      {info && <span className={styles.info}>{info}</span>}
      {parsedLyric && (
        <Lyric parsedLyric={parsedLyric} noTimestamp={noTimestamp!} />
      )}
    </div>
  )
})

export default Main
