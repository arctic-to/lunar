import { SnapshotOut, types } from 'mobx-state-tree'
import qs from 'qs'
import useSWR from 'swr'

import { Binding, Profile } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export function useUserDetail(uid?: string) {
  const { data, error } = useSWR<UserDetailResponseSnapshotOut>(
    uid ? `/user/detail?${qs.stringify({ uid })}` : null,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}

type UserDetailResponseSnapshotOut = SnapshotOut<typeof UserDetailResponse>

const UserDetailResponse = types.model('UserDetailResponse', {
  level: types.number,
  listenSongs: types.number,
  userPoint: types.model({
    userId: types.number,
    balance: types.number,
    updateTime: types.number,
    version: types.number,
    status: types.number,
    blockBalance: types.number,
  }),
  mobileSign: types.boolean,
  pcSign: types.boolean,
  profile: Profile,
  peopleCanSeeMyPlayRecord: types.boolean,
  bindings: types.array(Binding),
  adValid: types.boolean,
  code: types.number,
  createTime: types.number,
  createDays: types.number,
})
