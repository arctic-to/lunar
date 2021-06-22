import { NeteaseCloudMusicLikeSongEvent, Prisma } from '@prisma/client'

import { axios } from '../../fetcher'

const PATH = '/tracking/like'

export function trackNeteaseCloudMusicLikeSong(
  data: Prisma.NeteaseCloudMusicLikeSongEventCreateInput,
) {
  return axios
    .post<NeteaseCloudMusicLikeSongEvent[]>(PATH, data)
    .then((res) => res.data)
}
