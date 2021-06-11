import { NeteaseCloudMusicTag } from '@prisma/client'
import qs from 'qs'
import useSWR from 'swr'

import { axios, fetcher } from '../../fetcher'

import { AddTagDto, GenerateTagsDto } from './dto'

const PATH = '/song/tags'

export function generateTags(data: GenerateTagsDto) {
  return axios
    .post<NeteaseCloudMusicTag[][]>(`${PATH}/generate`, data)
    .then((res) => res.data)
}

export function addTag(data: AddTagDto) {
  return axios
    .post<NeteaseCloudMusicTag[][]>(PATH, data)
    .then((res) => res.data)
}

export function removeTag(tagId: number, songId: number) {
  return axios
    .delete<NeteaseCloudMusicTag[][]>(
      `${PATH}/${tagId}?${qs.stringify({ songId })}`,
    )
    .then((res) => res.data)
}

export function useSongTags(userId: number | undefined, songIds: number[]) {
  const { data, error } = useSWR<NeteaseCloudMusicTag[][]>(
    userId
      ? `${PATH}?${qs.stringify({ userId, songIds: songIds.join(',') })}`
      : null,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}
