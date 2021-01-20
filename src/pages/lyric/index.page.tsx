import c from 'classnames'
import dayjs from 'dayjs'
import { ipcRenderer, remote } from 'electron'
import { compact, inRange } from 'lodash'
import { observer } from 'mobx-react-lite'
import { applyPatch } from 'mobx-state-tree'
import { useEffect, useMemo, useState } from 'react'

import { useLyric } from '@/data'
import { useCurrentTrack, useStore } from '@/models'

import styles from './Lyric.module.scss'

export const Lyric: React.VFC = observer(() => {
  const [hovering, setHovering] = useState(false)
  const currentTrack = useCurrentTrack()
  const rootStore = useStore()
  const { data } = useLyric(currentTrack?.song.id ?? null)

  useEffect(() => {
    ipcRenderer.on('patch', (event, patch) => {
      applyPatch(rootStore, patch)
    })
  }, [rootStore])

  const lyric = useMemo(() => compact(data?.lrc?.lyric.split('\n')), [
    data?.lrc?.lyric,
  ])

  const parsedLyric = useMemo(
    () =>
      lyric?.map((rawSentence) => {
        const matches = rawSentence.match(
          /\[(?<minute>\d+):(?<second>\d+).(?<millisecond>\d+)\](?<content>.*)/,
        )
        return {
          begin: dayjs
            .duration({
              minutes: matches?.groups?.minute,
              seconds: matches?.groups?.second,
              milliseconds: matches?.groups?.millisecond,
            })
            .asMilliseconds(),
          content: matches?.groups?.content,
        }
      }),
    [lyric],
  )

  const filteredParsedLyric = useMemo(
    () => parsedLyric.filter((sentence) => sentence.content),
    [parsedLyric],
  )

  const nextSentenceIndex = useMemo(
    () =>
      filteredParsedLyric?.findIndex((sentence) => {
        return Number(sentence.begin) > (currentTrack?.currentTime ?? 0)
      }),
    [currentTrack?.currentTime, filteredParsedLyric],
  )

  const currSentence = useMemo(
    () => filteredParsedLyric[nextSentenceIndex - 1],
    [filteredParsedLyric, nextSentenceIndex],
  )
  const nextSentence = useMemo(() => filteredParsedLyric[nextSentenceIndex], [
    filteredParsedLyric,
    nextSentenceIndex,
  ])

  useEffect(() => {
    const win = remote.getCurrentWindow()
    setInterval(() => {
      const bounds = win.getBounds()
      const point = remote.screen.getCursorScreenPoint()
      setHovering(
        inRange(point.x, bounds.x, bounds.x + bounds.width) &&
          inRange(point.y, bounds.y, bounds.y + bounds.height),
      )
    })
  }, [])

  useEffect(() => {
    window.document.body.className = c(styles.container, {
      [styles.hover]: hovering,
    })
  }, [hovering])

  return (
    <>
      <div className={styles.curr_sentence}>{currSentence?.content}</div>
      <div className={styles.next_sentence}>{nextSentence?.content}</div>
    </>
  )
})

export default Lyric
