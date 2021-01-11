import { axios } from '../fetcher'

export type LoginSchema = {
  phone: string
  password: string
}

export async function login(data: LoginSchema) {
  return axios.post('/login/cellphone', data).then((res) => res.data)
}
