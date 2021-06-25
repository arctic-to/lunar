import { SnapshotIn, types } from 'mobx-state-tree'
import qs from 'qs'
import useSWR from 'swr'

import {
  ArtistResult,
  LyricResult,
  PlaylistResult,
  SongResult,
  UserResult,
} from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export enum SearchTypeEnum {
  Song = 1,
  Album = 10,
  Artist = 100,
  Playlist = 1000,
  User = 1002,
  MV = 1004,
  Lyric = 1006,
}

interface Params {
  keywords: string
  limit?: number
  offset?: number
  type?: SearchTypeEnum
}
export function useCloudSearch({
  keywords,
  limit = 30,
  offset = 0,
  type = SearchTypeEnum.Song,
}: Params) {
  const { data, error } = useSWR<CloudSearchResponse>(
    keywords
      ? `/cloudsearch?${qs.stringify({ keywords, limit, offset, type })}`
      : null,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}

export type CloudSearchSongResponseSnapshotIn = SnapshotIn<
  typeof CloudSearchSongResponse
>
const CloudSearchSongResponse = types.model('CloudSearchSongResponse', {
  result: types.model({
    songCount: types.number,
    songs: types.array(SongResult),
  }),
  code: types.number,
})

export type CloudSearchArtistResponseSnapshotIn = SnapshotIn<
  typeof CloudSearchArtistResponse
>
const CloudSearchArtistResponse = types.model('CloudSearchArtistResponse', {
  result: types.model({
    artistCount: types.number,
    artists: types.array(ArtistResult),
  }),
  code: types.number,
})

export type CloudSearchPlaylistResponseSnapshotIn = SnapshotIn<
  typeof CloudSearchPlaylistResponse
>
const CloudSearchPlaylistResponse = types.model('CloudSearchPlaylistResponse', {
  result: types.model({
    playlistCount: types.number,
    playlists: types.array(PlaylistResult),
  }),
  code: types.number,
})

export type CloudSearchUserResponseSnapshotIn = SnapshotIn<
  typeof CloudSearchUserResponse
>
const CloudSearchUserResponse = types.model('CloudSearchUserResponse', {
  result: types.model({
    userprofileCount: types.number,
    userprofiles: types.array(UserResult),
  }),
  code: types.number,
})

export type CloudSearchLyricResponseSnapshotIn = SnapshotIn<
  typeof CloudSearchLyricResponse
>
const CloudSearchLyricResponse = types.model('CloudSearchLyricResponse', {
  result: types.model({
    songCount: types.number,
    songs: types.array(LyricResult),
  }),
  code: types.number,
})

export type CloudSearchResponse =
  | CloudSearchSongResponseSnapshotIn
  | CloudSearchArtistResponseSnapshotIn
  | CloudSearchPlaylistResponseSnapshotIn
  | CloudSearchUserResponseSnapshotIn
  | CloudSearchLyricResponseSnapshotIn
