import { SnapshotOut, types } from 'mobx-state-tree'
import qs from 'qs'
import useSWR from 'swr'

import { Track, Privilege } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export enum RecordType {
  All,
  Week,
}

export function useUserRecord(uid: string, type?: RecordType) {
  const { data, error } = useSWR<UserRecordResponseSnapshotOut>(
    `/user/record?${qs.stringify({ uid, type })}`,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}

type UserRecordResponseSnapshotOut = SnapshotOut<typeof UserRecordResponse>

const UserRecordResponse = types.model('UserRecordResponse', {
  weekData: types.array(
    types.model({
      playCount: types.number,
      score: types.number,
      song: types.compose(
        'RecordSong',
        Track,
        types.model({
          privilege: Privilege,
        }),
      ),
    }),
  ),
  code: types.number,
})
