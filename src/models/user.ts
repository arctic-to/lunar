import useSWR from 'swr'

import { axios, fetcher } from './fetcher'

export type LoginSchema = {
  phone: string
  password: string
}

export function useUser() {
  const { data, error, mutate } = useSWR('/user/account', fetcher)

  return {
    loading: !data && !error,
    data,
    error,
    mutate,
  }
}

export async function login(data: LoginSchema) {
  return axios.post('/login/cellphone', data).then((res) => res.data)
}
