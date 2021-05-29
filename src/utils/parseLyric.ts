import { parseLyricString } from './parseLyricString'

type LyricResponse = {
  lrc?: {
    lyric: string
  }
  tlyric?: {
    lyric: string
  }
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

  return parsedLyric
}
