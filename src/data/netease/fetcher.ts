import _axios from 'axios'

export const axios = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_NETEASE_CLOUD_MUSIC_API,
  withCredentials: true,
})

export function fetcher<T>(url: string) {
  return axios.get<T>(url).then((res) => res.data)
}
