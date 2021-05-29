import c from 'classnames'
import { inRange } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useRef, useMemo } from 'react'
import { IoMdLocate } from 'react-icons/io'

import { useLyric } from '@/data'
import { useCurrentTrack } from '@/models'
import { parseLyric } from '@/utils'

import styles from './Lyric.module.scss'

export const Lyric: React.FC = observer(() => {
  const ref = useRef<HTMLDivElement>(null)
  const { song, currentTime, setCurrentTime, play } = useCurrentTrack() ?? {}
  const { data } = useLyric(song?.id)

  const parsedLyric = useMemo(() => data && parseLyric(data), [data])

  const jump = useCallback(
    (begin: number) => () => {
      setCurrentTime?.(begin)
      play?.()
    },
    [play, setCurrentTime],
  )

  const copy = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    navigator.clipboard.writeText(e.currentTarget.textContent ?? '')
  }, [])

  useEffect(() => {
    const currSentenceIndex = parsedLyric?.findIndex((sentence) =>
      inRange(
        currentTime ?? 0,
        sentence.begin,
        sentence.begin + sentence.duration,
      ),
    )

    if (currSentenceIndex === undefined) return
    if (!ref.current) return

    const currSentenceElement = ref.current.children[currSentenceIndex]

    if (currSentenceElement) {
      const isHighlight = currSentenceElement.classList.contains(styles.current)
      if (isHighlight) return

      Array.from(ref.current.children).forEach((child) =>
        child.classList.remove(styles.current),
      )
      currSentenceElement.classList.add(styles.current)
      window.requestAnimationFrame(() => {
        currSentenceElement.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        })
      })
    }
  }, [currentTime, parsedLyric])

  if (parsedLyric === undefined) return null

  return (
    <div className={styles.container} ref={ref}>
      {parsedLyric
        ? parsedLyric.map((sentence, index) => (
            <div key={index} className={c(styles.lyric)}>
              <div className={styles.raw_container}>
                <span className={styles.raw} onClick={copy}>
                  {sentence.content}
                </span>
                <IoMdLocate onClick={jump(sentence.begin)} />
              </div>
              {sentence.translation && (
                <span className={styles.translation} onClick={copy}>
                  {sentence.translation}
                </span>
              )}
            </div>
          ))
        : '纯音乐'}
    </div>
  )
})

export default Lyric