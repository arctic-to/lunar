import c from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useRef } from 'react'
import { IoMdLocate } from 'react-icons/io'

import { useLyricAnimation } from '@/hooks'
import { usePlayer } from '@/models'
import { ParsedLyric } from '@/utils'

import styles from './Lyric.module.scss'

interface LyricProps {
  parsedLyrics: ParsedLyric[]
  noTimestamp: boolean
}

export const Lyric: React.FC<LyricProps> = observer(
  ({ parsedLyrics, noTimestamp }) => {
    const ref = useRef<HTMLDivElement>(null)
    const { currentTime, setCurrentTime, play } = usePlayer().track

    useLyricAnimation({
      containerRef: ref,
      parsedLyrics,
      currentLyricStyle: styles.current,
      currentTime,
    })

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

    return (
      <div className={styles.container} ref={ref}>
        {parsedLyrics.map((lyric, index) => (
          <div key={index} className={c(styles.lyric)}>
            <div className={styles.row_container}>
              <span className={styles.row} onClick={copy}>
                {lyric.content}
              </span>
              {!noTimestamp && <IoMdLocate onClick={jump(lyric.begin)} />}
            </div>
            {lyric.translation && (
              <span className={styles.translation} onClick={copy}>
                {lyric.translation}
              </span>
            )}
          </div>
        ))}
      </div>
    )
  },
)

export default Lyric
