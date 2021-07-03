import { SnapshotOut, types } from 'mobx-state-tree'
import qs from 'qs'
import { useEffect } from 'react'
import useSWR from 'swr'

import {
  ArtistResult,
  LyricResult,
  PlaylistResult,
  SongResult,
  UserResult,
} from '@/models/Platform/Netease'
import { getMst, PrivilegeStore, setSongMap } from '@/stores'

const privilegeStore = getMst(PrivilegeStore)

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

function hasSongsProp(
  data: CloudSearchResponse,
): data is CloudSearchSongResponseSnapshot | CloudSearchLyricResponseSnapshot {
  return 'songs' in data.result
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

  useEffect(() => {
    if (data && hasSongsProp(data)) {
      setSongMap(data.result.songs)
      privilegeStore.setSongPrivilegeMap(
        data.result.songs,
        data.result.songs.map((song) => song.privilege),
      )
    }
  }, [data])

  return {
    loading: !data && !error,
    data,
    error,
  }
}

export type CloudSearchSongResponseSnapshot = SnapshotOut<
  typeof CloudSearchSongResponse
>
const CloudSearchSongResponse = types.model('CloudSearchSongResponse', {
  result: types.model({
    songCount: types.number,
    songs: types.array(SongResult),
  }),
  code: types.number,
})

export type CloudSearchArtistResponseSnapshot = SnapshotOut<
  typeof CloudSearchArtistResponse
>
const CloudSearchArtistResponse = types.model('CloudSearchArtistResponse', {
  result: types.model({
    artistCount: types.number,
    artists: types.array(ArtistResult),
  }),
  code: types.number,
})

export type CloudSearchPlaylistResponseSnapshot = SnapshotOut<
  typeof CloudSearchPlaylistResponse
>
const CloudSearchPlaylistResponse = types.model('CloudSearchPlaylistResponse', {
  result: types.model({
    playlistCount: types.number,
    playlists: types.array(PlaylistResult),
  }),
  code: types.number,
})

export type CloudSearchUserResponseSnapshot = SnapshotOut<
  typeof CloudSearchUserResponse
>
const CloudSearchUserResponse = types.model('CloudSearchUserResponse', {
  result: types.model({
    userprofileCount: types.number,
    userprofiles: types.array(UserResult),
  }),
  code: types.number,
})

export type CloudSearchLyricResponseSnapshot = SnapshotOut<
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
  | CloudSearchSongResponseSnapshot
  | CloudSearchArtistResponseSnapshot
  | CloudSearchPlaylistResponseSnapshot
  | CloudSearchUserResponseSnapshot
  | CloudSearchLyricResponseSnapshot
