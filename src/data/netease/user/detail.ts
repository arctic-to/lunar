import { SnapshotOut, types } from 'mobx-state-tree'
import qs from 'qs'
import useSWR from 'swr'

import { Profile } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export function useUserDetail(uid: string) {
  const { data, error } = useSWR<UserDetailResponseSnapshotOut>(
    `/user/detail?${qs.stringify({ uid })}`,
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
  bindings: types.array(
    types.model({
      url: types.string,
      userId: types.number,
      expiresIn: types.number,
      refreshTime: types.number,
      bindingTime: types.number,
      tokenJsonStr: types.null,
      expired: types.boolean,
      id: types.number,
      type: types.number,
    }),
  ),
  adValid: types.boolean,
  code: types.number,
  createTime: types.number,
  createDays: types.number,
})
