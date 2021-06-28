import { SnapshotOut, types } from 'mobx-state-tree'
import { useEffect, useState } from 'react'

import { Account, Profile } from '@/models/Platform/Netease'

import { axios } from '../fetcher'

export function useUserAccount() {
  const [data, setData] = useState<UserAccountResponseSnapshot>()
  const [error, setError] = useState()

  useEffect(() => {
    axios
      .get<UserAccountResponseSnapshot>(`/user/account?timestamp=${Date.now()}`)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
  }, [])

  return {
    data,
    error,
  }
}

type UserAccountResponseSnapshot = SnapshotOut<typeof UserAccountResponse>
const UserAccountResponse = types.model('UserAccountResponse', {
  code: types.number,
  account: types.maybeNull(Account),
  profile: types.maybeNull(Profile),
})
