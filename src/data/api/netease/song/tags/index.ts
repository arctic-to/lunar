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

type NeteaseCloudMusicSongTagMap = [number, NeteaseCloudMusicTag[]][]

export function useSongTags(userId: number | undefined, playlistId: number) {
  const { data, error } = useSWR<NeteaseCloudMusicSongTagMap>(
    userId ? `${PATH}?${qs.stringify({ userId, playlistId })}` : null,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}
