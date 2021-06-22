import { SnapshotOut, types } from 'mobx-state-tree'
import qs from 'qs'
import useSWR from 'swr'

import { Track, Privilege } from '@/models/Platform/Netease'

import { fetcher } from '../fetcher'

export function useAlbum(id?: string) {
  const { data, error } = useSWR<AlbumResponseSnapshot>(
    id ? `/album?${qs.stringify({ id })}` : null,
    fetcher,
  )

  return {
    loading: !data && !error,
    data,
    error,
  }
}

type AlbumResponseSnapshot = SnapshotOut<typeof AlbumResponse>

const AlbumResponse = types.model('AlbumResponse', {
  code: types.number,
  resourceState: types.boolean,
  songs: types.array(
    types.compose(
      'AlbumSong',
      Track,
      types.model({
        privilege: Privilege,
      }),
    ),
  ),
  album: types.model({
    songs: types.array(types.undefined),
    paid: types.boolean,
    onSale: types.boolean,
    mark: types.number,
    blurPicUrl: types.string,
    companyId: types.number,
    alias: types.array(types.string),
    artists: types.array(
      types.model({
        img1v1Id: types.number,
        topicPerson: types.number,
        alias: types.array(types.undefined),
        picId: types.number,
        briefDesc: types.string,
        musicSize: types.number,
        albumSize: types.number,
        picUrl: types.string,
        img1v1Url: types.string,
        followed: types.boolean,
        trans: types.string,
        name: types.string,
        id: types.number,
        img1v1Id_str: types.string,
      }),
    ),
    copyrightId: types.number,
    picId: types.number,
    artist: types.model({
      img1v1Id: types.number,
      topicPerson: types.number,
      alias: types.array(types.string),
      picId: types.number,
      briefDesc: types.string,
      musicSize: types.number,
      albumSize: types.number,
      picUrl: types.string,
      img1v1Url: types.string,
      followed: types.boolean,
      trans: types.string,
      name: types.string,
      id: types.number,
      picId_str: types.string,
      img1v1Id_str: types.string,
    }),
    publishTime: types.number,
    company: types.string,
    briefDesc: types.string,
    picUrl: types.string,
    commentThreadId: types.string,
    pic: types.number,
    tags: types.string,
    description: types.string,
    status: types.number,
    subType: types.string,
    name: types.string,
    id: types.number,
    type: types.string,
    size: types.number,
    picId_str: types.string,
    info: types.model({
      commentThread: types.model({
        id: types.string,
        resourceInfo: types.model({
          id: types.number,
          userId: -types.number,
          name: types.string,
          imgUrl: types.string,
          creator: types.null,
          encodedId: types.null,
          subTitle: types.null,
          webUrl: types.null,
        }),
        resourceType: types.number,
        commentCount: types.number,
        likedCount: types.number,
        shareCount: types.number,
        hotCount: types.number,
        latestLikedUsers: types.null,
        resourceId: types.number,
        resourceOwnerId: -types.number,
        resourceTitle: types.string,
      }),
      latestLikedUsers: types.null,
      liked: types.boolean,
      comments: types.null,
      resourceType: types.number,
      resourceId: types.number,
      commentCount: types.number,
      likedCount: types.number,
      shareCount: types.number,
      threadId: types.string,
    }),
  }),
})
