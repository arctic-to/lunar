import { SnapshotOut, types } from 'mobx-state-tree'

import { Account, Binding, Profile } from '@/models/Platform'

import { axios } from '../fetcher'

export type LoginSchema = {
  phone: string
  password: string
}

export async function login(data: LoginSchema) {
  return axios
    .post<LoginResponseSnapshot>('/login/cellphone', data)
    .then((res) => res.data)
}

type LoginResponseSnapshot = SnapshotOut<typeof LoginResponse>
const LoginResponse = types.model({
  loginType: types.number,
  code: types.number,
  account: Account,
  token: types.string,
  profile: Profile,
  bindings: types.array(Binding),
  cookie: types.string,
})
