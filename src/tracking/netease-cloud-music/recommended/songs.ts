import { NeteaseCloudMusicRecommendedSongs, Prisma } from '@prisma/client'
import useSWR from 'swr'

import { usePlatform } from '@/models'

import { fetcher, axios } from '../fetcher'

const PATH = '/recommended/songs'

export function useNeteaseCloudMusicRecommendedSongs() {
  const { netease } = usePlatform()
  const { data, error, mutate } = useSWR<NeteaseCloudMusicRecommendedSongs[]>(
    netease?.profile ? `${PATH}?userId=${netease?.profile.userId}` : null,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
    mutate,
  }
}

export function trackNeteaseCloudMusicRecommendedSongs(
  data: Prisma.NeteaseCloudMusicRecommendedSongsCreateInput,
) {
  return axios
    .post<NeteaseCloudMusicRecommendedSongs[]>(PATH, data)
    .then((res) => res.data)
}
