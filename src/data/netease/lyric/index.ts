import { SnapshotIn, types } from 'mobx-state-tree'
import qs from 'qs'
import useSWR from 'swr'
import { Maybe } from 'yup/lib/types'

import { fetcher } from '../fetcher'

export function useLyric(id: Maybe<number | string>) {
  const { data, error } = useSWR<LyricResponseSnapshotIn>(
    id ? `/lyric?${qs.stringify({ id })}` : null,
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
  lrc: types.maybe(
    types.model({
      version: types.number,
      lyric: types.string,
    }),
  ),
  klyric: types.maybe(
    types.model({
      version: types.number,
      lyric: types.string,
    }),
  ),
  tlyric: types.maybe(
    types.model({
      version: types.number,
      lyric: types.string,
    }),
  ),
  nolyric: types.maybe(types.boolean),
  needDesc: types.maybe(types.boolean),
  briefDesc: types.null,
  code: types.number,
})
