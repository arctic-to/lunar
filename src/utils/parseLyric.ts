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

export function parseLyric({ lrc, tlyric }: LyricResponse) {
  if (!(lrc && tlyric)) return null

  const lyricObj = parseLyricString(lrc.lyric)
  const tlyricObj = parseLyricString(tlyric.lyric)

  const parsedLyric = lyricObj.map((sentence) => {
    const translation = tlyricObj.find(
      (tSentence) => tSentence.begin === sentence.begin,
    )?.content
    return {
      ...sentence,
      translation,
    }
  })

  const hasTimestamp = parsedLyric.some(({ duration }) => duration)

  if (hasTimestamp && parsedLyric[0] && parsedLyric[1]) {
    parsedLyric[0].duration = parsedLyric[1].begin
    parsedLyric[0].begin = 0
    parsedLyric.slice(-1)[0].duration = Number.MAX_SAFE_INTEGER
  }

  return { parsedLyric, hasTimestamp }
}
