import { NeteaseCloudMusicLikeSongEvent, Prisma } from '@prisma/client'

import { axios } from '../fetcher'

const PATH = '/like'

export function trackNeteaseCloudMusicLikeSong(
  data: Prisma.NeteaseCloudMusicLikeSongEventCreateInput,
) {
  return axios
    .post<NeteaseCloudMusicLikeSongEvent[]>(PATH, data)
    .then((res) => res.data)
}
