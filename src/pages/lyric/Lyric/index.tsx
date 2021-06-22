import { inRange } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useRef } from 'react'

import { useCurrentTrack } from '@/models'
import { ParsedLyric } from '@/utils'

import styles from './Lyric.module.scss'

interface LyricProps {
  parsedLyric: ParsedLyric
}

export const Lyric: React.FC<LyricProps> = observer(({ parsedLyric }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { currentTime } = useCurrentTrack() ?? {}

  const copy = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
    navigator.clipboard.writeText(e.currentTarget.textContent ?? '')
  }, [])

  useEffect(() => {
    const currSentenceIndex = parsedLyric.findIndex((sentence) =>
      inRange(
        currentTime ?? 0,
        sentence.begin,
        sentence.begin + sentence.duration,
      ),
    )

    const container = ref.current
    if (currSentenceIndex === undefined) return
    if (!container) return
    const currSentenceElem = container.children[currSentenceIndex]
    if (!(currSentenceElem instanceof HTMLDivElement)) return

    const isHighlight = currSentenceElem.classList.contains(styles.current)
    if (isHighlight) return

    Array.from(container.children).forEach((child) =>
      child.classList.remove(styles.current),
    )
    currSentenceElem.classList.add(styles.current)
    window.requestAnimationFrame(() => {
      currSentenceElem.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      })
    })
  }, [currentTime, parsedLyric])

  return (
    <div className={styles.container} ref={ref}>
      {parsedLyric.map((sentence, index) => (
        <div key={index} className={styles.lyric_container}>
          <span className={styles.lyric} onClick={copy}>
            {sentence.content}
          </span>
          {sentence.translation && (
            <span className={styles.translation} onClick={copy}>
              {sentence.translation}
            </span>
          )}
        </div>
      ))}
    </div>
  )
})

export default Lyric
