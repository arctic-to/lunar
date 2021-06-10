import { NeteaseCloudMusicTag } from '@prisma/client'
import qs from 'qs'
import useSWR from 'swr'

import { fetcher } from '../fetcher'

const PATH = '/tags'

export function useTags(userId: number | undefined) {
  const { data, error } = useSWR<NeteaseCloudMusicTag[]>(
    userId ? `${PATH}?${qs.stringify({ userId })}` : null,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}
