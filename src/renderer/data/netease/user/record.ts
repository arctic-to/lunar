import { SnapshotOut, types } from 'mobx-state-tree'
import qs from 'qs'
import { useEffect } from 'react'
import useSWR from 'swr'

import { Track, Privilege } from '@/models/Platform/Netease'
import { getMst, PrivilegeStore, setSongMap } from '@/stores'

import { fetcher } from '../fetcher'

const privilegeStore = getMst(PrivilegeStore)

export enum RecordType {
  All,
  Week,
}

export function useUserRecord(uid?: string, type?: RecordType) {
  const { data, error } = useSWR<UserRecordResponseSnapshotOut>(
    uid ? `/user/record?${qs.stringify({ uid, type })}` : null,
    fetcher,
  )

  useEffect(() => {
    if (data) {
      const songs = data.weekData.map((data) => data.song)
      setSongMap(songs)
      privilegeStore.setSongPrivilegeMap(
        songs,
        data.weekData.map((data) => data.song.privilege),
      )
    }
  }, [data])

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
