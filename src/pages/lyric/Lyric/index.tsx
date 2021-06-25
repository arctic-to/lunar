import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'

import { useLyricAnimation } from '@/hooks'
import { usePlayer } from '@/models'
import { ParsedLyric } from '@/utils'

import styles from './Lyric.module.scss'

interface LyricProps {
  parsedLyrics: ParsedLyric[]
}

export const Lyric: React.FC<LyricProps> = observer(({ parsedLyrics }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { lyric } = usePlayer()

  useLyricAnimation({
    containerRef: ref,
    parsedLyrics,
    currentLyricStyle: styles.current,
  })

  return (
    <div className={styles.container} ref={ref}>
      {parsedLyrics.map((parsedLyric, index) => (
        <div key={index} className={styles.lyric_container}>
          <span className={styles.lyric}>
            {lyric.phonetic && parsedLyric.phonetic ? (
              <span
                dangerouslySetInnerHTML={{ __html: parsedLyric.phonetic }}
              />
            ) : (
              parsedLyric.content
            )}
          </span>
          {lyric.translation && parsedLyric.translation && (
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
