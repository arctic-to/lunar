import useSWR from 'swr'

import { fetcher } from './fetcher'

export function useDailySongs() {
  const { data, error } = useSWR('/recommend/songs', fetcher)

  return {
    loading: !data && !error,
    data,
    error,
  }
}
