import { inRange } from 'lodash'
import { RefObject, useEffect } from 'react'

import { useCurrentTrack } from '@/models'
import { ParsedLyric } from '@/utils'

interface props {
  containerRef: RefObject<HTMLDivElement>
  parsedLyrics: ParsedLyric[]
  currentLyricStyle: string
}

export function useLyricAnimation({
  containerRef,
  parsedLyrics,
  currentLyricStyle,
}: props) {
  const { currentTime } = useCurrentTrack() ?? {}

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const currLyricIndex = parsedLyrics.findIndex((lyric) =>
      inRange(currentTime ?? 0, lyric.begin, lyric.begin + lyric.duration),
    )
    if (currLyricIndex === undefined) return

    const currLyricElement = container.children[currLyricIndex]

    if (currLyricElement) {
      const isHighlight = currLyricElement.classList.contains(currentLyricStyle)
      if (isHighlight) return

      Array.from(container.children).forEach((child) =>
        child.classList.remove(currentLyricStyle),
      )
      currLyricElement.classList.add(currentLyricStyle)
      window.requestAnimationFrame(() => {
        currLyricElement.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        })
      })
    }
  }, [containerRef, currentLyricStyle, currentTime, parsedLyrics])
}
