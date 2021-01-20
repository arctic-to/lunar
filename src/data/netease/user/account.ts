import { SnapshotOut, types } from 'mobx-state-tree'
import useSWR from 'swr'

import { Account, Profile } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export function useUserAccount() {
  const { data, error, mutate } = useSWR<UserAccountResponseSnapshot>(
    '/user/account',
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
    mutate,
  }
}

type UserAccountResponseSnapshot = SnapshotOut<typeof UserAccountResponse>
const UserAccountResponse = types.model('UserAccountResponse', {
  code: types.number,
  account: types.maybeNull(Account),
  profile: types.maybeNull(Profile),
})
