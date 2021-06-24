import { parseLyricString } from './parseLyricString'

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

export type ParsedLyric = {
  translation: string | undefined
  duration: number
  begin: number
  content: string | undefined
}[]

export function parseLyric({ lrc, tlyric }: LyricResponse) {
  if (!(lrc && tlyric)) {
    return {
      parsedLyrics: null,
      noTimestamp: true,
    }
  }

  const lyricObj = parseLyricString(lrc.lyric)
  const tlyricObj = parseLyricString(tlyric.lyric)

  const parsedLyrics = lyricObj.map((sentence) => {
    const translation = tlyricObj.find(
      (tSentence) => tSentence.begin === sentence.begin,
    )?.content
    return {
      ...sentence,
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
