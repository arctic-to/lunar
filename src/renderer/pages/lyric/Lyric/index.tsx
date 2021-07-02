import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'

import { useLyricAnimation } from '@/hooks'
import { ParsedLyric } from '@/utils'

import { useLyricStore } from '../store'

import styles from './Lyric.module.scss'

interface LyricProps {
  parsedLyrics: ParsedLyric[]
}

export const Lyric: React.FC<LyricProps> = observer(({ parsedLyrics }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { currentTime, phonetic, translation } = useLyricStore()

  useLyricAnimation({
    containerRef: ref,
    parsedLyrics,
    currentLyricStyle: styles.current,
    currentTime,
  })

  return (
    <div className={styles.container} ref={ref}>
      {parsedLyrics.map((parsedLyric, index) => (
        <div key={index} className={styles.lyric_container}>
          <span className={styles.lyric}>
            {phonetic && parsedLyric.phonetic ? (
              <span
                dangerouslySetInnerHTML={{ __html: parsedLyric.phonetic }}
              />
            ) : (
              parsedLyric.content
            )}
          </span>
          {translation && parsedLyric.translation && (
            <span className={styles.translation}>
              {parsedLyric.translation}
            </span>
          )}
        </div>
      ))}
    </div>
  )
})

export default Lyric
