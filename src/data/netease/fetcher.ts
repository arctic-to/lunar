import _axios from 'axios'

export const axios = _axios.create({
  baseURL: 'http://101.32.178.46:1230',
  withCredentials: true,
})

export const fetcher = (url: string) => axios.get(url).then((res) => res.data)
