import useSWR from 'swr'

import { fetcher } from './fetcher'

export function useSongUrl(id: number | null) {
  const { data, error } = useSWR(id ? `/song/url?id=${id}` : null, fetcher)

  return {
    loading: !data && !error,
    data: data?.data[0],
    error,
  }
}
