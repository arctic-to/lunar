import { NeteaseCloudMusicRecommendedSongs, Prisma } from '@prisma/client'
import useSWR from 'swr'

import { useUserAccount } from '@/data'

import { fetcher, axios } from '../fetcher'

const PATH = '/netease-cloud-music/recommended/songs'

export function useNeteaseCloudMusicRecommendedSongs() {
  const { data: userAccountData } = useUserAccount()
  const { data, error, mutate } = useSWR<NeteaseCloudMusicRecommendedSongs[]>(
    userAccountData?.account
      ? `${PATH}?userId=${userAccountData.account.id}`
      : null,
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
