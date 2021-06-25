import { AsyncReturnType } from 'type-fest'

import { phoneticizeLyric } from './phoneticizeLyric'
import { segmentLyric } from './segmentLyric'

type LyricResponse = {
  lrc?:
    | {
        lyric: string
      }
    | undefined
  tlyric?:
    | {
        lyric: string
      }
    | undefined
}

export type ParsedLyric = NonNullable<
  AsyncReturnType<typeof parseLyric>['parsedLyrics']
>[0]

export async function parseLyric({ lrc, tlyric }: LyricResponse) {
  if (!(lrc && tlyric)) {
    return {
      parsedLyrics: null,
      noTimestamp: true,
    }
  }

  const lyrics = await phoneticizeLyric(segmentLyric(lrc.lyric))
  const tlyrics = segmentLyric(tlyric.lyric)

  const parsedLyrics = lyrics.map((lyric) => {
    const translation = tlyrics.find(
      (tlyric) => tlyric.begin === lyric.begin,
    )?.content
    return {
      ...lyric,
      translation,
    }
  })

  const noTimestamp = parsedLyrics.every(({ begin }) => begin === 0)

  if (!noTimestamp && parsedLyrics[0] && parsedLyrics[1]) {
    parsedLyrics[0].duration = parsedLyrics[1].begin
    parsedLyrics[0].begin = 0
    parsedLyrics.slice(-1)[0].duration = Number.MAX_SAFE_INTEGER
  }

  return { parsedLyrics, noTimestamp }
}
