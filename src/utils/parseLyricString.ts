import dayjs from 'dayjs'
import { compact } from 'lodash'

export function parseLyricString(rawLyric: string) {
  const lyric = compact(rawLyric.split('\n'))
  const parsedLyric = lyric
    ?.map((rawSentence) => {
      const matches = rawSentence.match(
        /(\[(?<minute>\d+):(?<second>\d+).(?<millisecond>\d+)\])?(?<content>.*)/,
      )
      return {
        begin: dayjs
          .duration({
            minutes: matches?.groups?.minute,
            seconds: matches?.groups?.second,
            milliseconds: matches?.groups?.millisecond,
          })
          .asMilliseconds(),
        content: matches?.groups?.content,
      }
    })
    .sort((sentence1, sentence2) => sentence1.begin - sentence2.begin)
    .map((sentence, index, parsedLyric) => {
      const nextSentence = parsedLyric[index + 1]
      return {
        ...sentence,
        duration: nextSentence ? nextSentence.begin - sentence.begin : 0,
      }
    })

  return parsedLyric.filter((sentence) => sentence.content)
}
