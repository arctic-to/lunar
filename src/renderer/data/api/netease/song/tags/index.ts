import { NeteaseCloudMusicSong, NeteaseCloudMusicTag } from '@prisma/client'
import qs from 'qs'
import useSWR from 'swr'

import { axios, fetcher } from '../../fetcher'

import { AddTagDto, GenerateTagsDto } from './dto'

const PATH = '/song/tags'

export function generateTags(data: GenerateTagsDto) {
  if (data.songIds.length) {
    return axios.post<void>(`${PATH}/generate`, data).then((res) => res.data)
  }
}

type SongWithTags = NeteaseCloudMusicSong & {
  tags: NeteaseCloudMusicTag[]
}

export function addTag(data: AddTagDto) {
  return axios.post<SongWithTags>(PATH, data).then((res) => res.data)
}

export function removeTag(songId: number, userId: number, tagId: number) {
  return axios
    .delete<SongWithTags>(`${PATH}?${qs.stringify({ songId, userId, tagId })}`)
    .then((res) => res.data)
}

type SongTagPair = [number, NeteaseCloudMusicTag[]]

export function useSongTags(userId: number | undefined, playlistId: number) {
  const { data, error } = useSWR<SongTagPair[]>(
    userId ? `${PATH}?${qs.stringify({ userId, playlistId })}` : null,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}
