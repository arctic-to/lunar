import { SnapshotIn, types } from 'mobx-state-tree'

const Lrc = types.model('Lrc', {
  version: types.number,
  lyric: types.string,
})

export type LyricResponseSnapshotIn = SnapshotIn<typeof LyricResponse>
export const LyricResponse = types.model('LyricResponse', {
  code: types.number,
  sgc: types.boolean,
  sfy: types.boolean,
  qfy: types.boolean,

  // lyric case
  lrc: types.maybe(Lrc),
  klyric: types.maybe(Lrc),
  tlyric: types.maybe(Lrc),

  // no lyric case
  nolyric: types.maybe(types.boolean),
  uncollected: types.maybe(types.boolean),
  needDesc: types.maybe(types.boolean),
  briefDesc: types.maybe(types.null),
})

const ParsedLyric = types.model('ParsedLyric', {
  translation: types.maybe(types.string),
  phonetic: types.maybe(types.string),
  duration: types.number,
  begin: types.number,
  timestamp: types.maybe(types.string),
  content: types.string,
})

export const Lyric = types.model('Lyric', {
  parsedLyrics: types.maybeNull(types.array(ParsedLyric)),
  noTimestamp: types.boolean,
  raw: LyricResponse,
})
