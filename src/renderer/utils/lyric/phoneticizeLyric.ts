import Kuroshiro from 'kuroshiro'
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji'
import { AsyncReturnType } from 'type-fest'

import { SegmentedLyric } from './segmentLyric'

const kuroshiro = new Kuroshiro()
const analyzer = new KuromojiAnalyzer({
  dictPath: 'D:/repo/arctic-to/lunar/node_modules/kuromoji/dict',
})
let hasInited = false

export type PhoneticizedLyric = AsyncReturnType<typeof phoneticizeLyric>[0]

export async function phoneticizeLyric(lyrics: SegmentedLyric[]) {
  if (!hasInited) {
    await kuroshiro.init(analyzer)
    hasInited = true
  }

  return await Promise.all(
    lyrics.map(async (lyric) => ({
      ...lyric,
      phonetic: (await kuroshiro.convert(lyric.content, {
        mode: 'furigana',
        to: 'hiragana',
      })) as string | undefined,
    })),
  )
}
