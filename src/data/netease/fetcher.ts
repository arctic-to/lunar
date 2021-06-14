import _axios from 'axios'

export const axios = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_NETEASE_CLOUD_MUSIC_API!,
  withCredentials: true,
})

export function fetcher<T>(url: string, withCredentials = true) {
  return axios.get<T>(url, { withCredentials }).then((res) => res.data)
}
