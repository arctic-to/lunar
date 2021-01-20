import { SnapshotIn, types } from 'mobx-state-tree'
import useSWR from 'swr'

import { fetcher } from '../fetcher'

export function useLyric(id: number | null) {
  const { data, error } = useSWR<LyricResponseSnapshotIn>(
    id === null ? null : `/lyric?id=${id}`,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}

type LyricResponseSnapshotIn = SnapshotIn<typeof LyricResponse>
const LyricResponse = types.model('LyricResponse', {
  sgc: types.boolean,
  sfy: types.boolean,
  qfy: types.boolean,
  lrc: types.model({
    version: types.number,
    lyric: types.string,
  }),
  klyric: types.model({
    version: types.number,
    lyric: types.string,
  }),
  tlyric: types.model({
    version: types.number,
    lyric: types.string,
  }),
  code: types.number,
})
