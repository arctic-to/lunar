import dayjs from 'dayjs'
import { compact } from 'lodash'

interface RawParsedLyric {
  begin: number
  content: string | undefined
}

// https://stackoverflow.com/a/34789675/13151903
// https://regex101.com/r/WToTPn/1
const regex =
  /(?:\[(?<m>\d+):(?<s>\d+)\.(?<ms>\d+)\])?(?:(?=\[\d+:\d+\.\d+\])|(?<content>.*))/gs

export function parseLyricString(rawLyric: string) {
  const lyric = compact(rawLyric.split('\n'))
  const rawParsedLyric: RawParsedLyric[] = []

  lyric?.forEach((rawSentence) => {
    const matches = rawSentence.matchAll(regex)
    let content: string
    const _rawParsedLyric: RawParsedLyric[] = []

    Array.from(matches)
      .reverse()
      .forEach((match) => {
        const _content = match?.groups?.content
        if (_content) {
          content = _content
        }

        _rawParsedLyric.push({
          begin: dayjs
            .duration({
              minutes: Number(match?.groups?.m),
              seconds: Number(match?.groups?.s),
              milliseconds: Number(match?.groups?.ms),
            })
            .asMilliseconds(),
          content,
        })
      })

    rawParsedLyric.push(..._rawParsedLyric)
  })

  return rawParsedLyric
    .sort((sentence1, sentence2) => sentence1.begin - sentence2.begin)
    .map((sentence, index, rawParsedLyric) => {
      const nextSentence = rawParsedLyric[index + 1]
      return {
        ...sentence,
        duration: nextSentence ? nextSentence.begin - sentence.begin : 0,
      }
    })
    .filter((sentence) => sentence.content)
}
