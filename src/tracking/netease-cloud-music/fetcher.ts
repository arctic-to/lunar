import _axios from 'axios'

export const axios = _axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HORIZON_TRACKING}/netease-cloud-music`,
})

export const fetcher = (url: string) => axios.get(url).then((res) => res.data)
