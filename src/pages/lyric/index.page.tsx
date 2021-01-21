import c from 'classnames'
import dayjs from 'dayjs'
import { ipcRenderer, remote } from 'electron'
import { compact, inRange } from 'lodash'
import { observer } from 'mobx-react-lite'
import { applyAction, applySnapshot } from 'mobx-state-tree'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useLyric } from '@/data'
import { useCurrentTrack, usePlayer, PlayerSnapshotOut } from '@/models'

import styles from './Lyric.module.scss'

export const Lyric: React.VFC = observer(() => {
  const ref = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const player = usePlayer()
  const currentTrack = useCurrentTrack()
  const { data } = useLyric(currentTrack?.song.id ?? null)

  useEffect(() => {
    ipcRenderer.on(
      'store:player:init',
      (event, playerSnapshot: PlayerSnapshotOut) => {
        applySnapshot(player, playerSnapshot)
      },
    )
  }, [player])

  useEffect(() => {
    ipcRenderer.on('store:player:action', (event, action) => {
      applyAction(player, action)
    })
  }, [player])

  useEffect(() => {
    if (!currentTrack) return
    currentTrack.playing
      ? currentTrack.currentTimeObserver(100)()
      : currentTrack.unobserveCurrentTime()
  }, [currentTrack, currentTrack?.playing])

  const lyric = useMemo(() => compact(data?.lrc?.lyric.split('\n')), [
    data?.lrc?.lyric,
  ])

  const parsedLyric = useMemo(
    () =>
      lyric
        ?.map((rawSentence) => {
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
        })
        .sort((sentence1, sentence2) => sentence1.begin - sentence2.begin)
        .map((sentence, index, parsedLyric) => {
          const nextSentence = parsedLyric[index + 1]
          return {
            ...sentence,
            duration: nextSentence ? nextSentence.begin - sentence.begin : 0,
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
    window.document.body.className = c(styles.body, {
      [styles.hover]: hovering,
    })
  }, [hovering])

  useEffect(() => {
    const container = ref.current
    const currSentenceElem = container?.firstElementChild
    if (!(container && currSentenceElem instanceof HTMLDivElement)) return

    /**
     * Reset position.
     */
    currSentenceElem.style.transform = ''

    const { width: containerWidth } = container.getBoundingClientRect()
    const {
      width: currSentenceWidth,
    } = currSentenceElem.getBoundingClientRect()
    const currSentenceOverflowWidth = currSentenceWidth - containerWidth
    const start = Date.now()

    window.requestAnimationFrame(function step() {
      if (!(currSentence && currSentenceElem instanceof HTMLDivElement)) return
      const percentage = (Date.now() - start) / currSentence.duration

      const BEGIN_PERCENTAGE = 0.3
      const END_PERCENTAGE = 0.8
      const MOVEMENT_SPEED = 1 / (END_PERCENTAGE - BEGIN_PERCENTAGE)

      if (percentage > BEGIN_PERCENTAGE) {
        currSentenceElem.style.transform = `translateX(-${
          MOVEMENT_SPEED *
          (percentage - BEGIN_PERCENTAGE) *
          currSentenceOverflowWidth
        }px)`
      }
      if (percentage < END_PERCENTAGE) window.requestAnimationFrame(step)
    })
  }, [currSentence, player.lyric.bounds.width, player.lyric.bounds.height])

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.curr_sentence}>{currSentence?.content}</div>
      <div className={styles.next_sentence}>{nextSentence?.content}</div>
    </div>
  )
})

export default Lyric
