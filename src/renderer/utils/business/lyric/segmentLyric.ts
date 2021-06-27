import dayjs from 'dayjs'
import { compact } from 'lodash'
import { Object } from 'ts-toolbelt'

interface RawLyric {
  begin: number
  timestamp: string | undefined
  content: string | undefined
}

// https://stackoverflow.com/a/34789675/13151903
// https://regex101.com/r/WToTPn/1
const regex =
  /(?<timestamp>\[(?<m>\d+):(?<s>\d+)(?:\.(?<ms>\d+))?\])?(?:(?=\[\d+:\d+\.\d+\])|(?<content>.*))/gs

interface _SegmentedLyric extends RawLyric {
  duration: number
}

function hasContent(
  lyric: _SegmentedLyric,
): lyric is Object.NonNullable<_SegmentedLyric, 'content'> {
  return Boolean(lyric.content)
}

export type SegmentedLyric = ReturnType<typeof segmentLyric>[0]

export function segmentLyric(rawLyric: string) {
  const lyricStrings = compact(rawLyric.split('\n'))
  const rawLyrics: RawLyric[] = []

  lyricStrings?.forEach((lyricString) => {
    const matches = lyricString.matchAll(regex)
    let content: string
    const _rawLyrics: RawLyric[] = []

    Array.from(matches)
      .reverse()
      .forEach((match) => {
        const _content = match?.groups?.content
        if (_content) {
          content = _content
        }

        _rawLyrics.push({
          begin: dayjs
            .duration({
              minutes: Number(match?.groups?.m),
              seconds: Number(match?.groups?.s),
              milliseconds: Number(match?.groups?.ms),
            })
            .asMilliseconds(),
          timestamp: match?.groups?.timestamp,
          content,
        })
      })

    rawLyrics.push(..._rawLyrics)
  })

  return (
    rawLyrics
      .sort((lyric1, lyric2) => lyric1.begin - lyric2.begin)
      .map((lyric, index, rawLyrics) => {
        const nextLyric = rawLyrics[index + 1]
        return {
          ...lyric,
          duration: nextLyric ? nextLyric.begin - lyric.begin : 0,
        }
      })
      // https://2ality.com/2020/06/type-guards-assertion-functions-typescript.html#the-array-method-.filter()-produces-arrays-with-narrower-types
      .filter(hasContent)
  )
}
