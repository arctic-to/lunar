import { types } from 'mobx-state-tree'

import { Creator } from './Creator'
import { Track } from './Track'
import { TrackId } from './TrackId'

export const PlaylistDetail = types.model('PlaylistDetail', {
  subscribers: types.array(types.frozen()),
  subscribed: types.maybeNull(types.boolean),
  creator: Creator,
  tracks: types.array(Track),
  videoIds: types.null,
  videos: types.null,
  trackIds: types.array(TrackId),
  updateFrequency: types.null,
  backgroundCoverId: types.number,
  backgroundCoverUrl: types.null,
  titleImage: types.number,
  titleImageUrl: types.null,
  englishTitle: types.null,
  opRecommend: types.boolean,
  trackNumberUpdateTime: types.number,
  adType: types.number,
  userId: types.number,
  subscribedCount: types.number,
  cloudTrackCount: types.number,
  trackCount: types.number,
  coverImgUrl: types.string,
  newImported: types.boolean,
  updateTime: types.number,
  coverImgId: types.number,
  commentThreadId: types.string,
  specialType: types.number,
  createTime: types.number,
  highQuality: types.boolean,
  privacy: types.number,
  trackUpdateTime: types.number,
  playCount: types.number,
  description: types.maybeNull(types.string),
  ordered: types.boolean,
  tags: types.array(types.frozen()),
  status: types.number,
  name: types.string,
  id: types.number,
  shareCount: types.number,
  coverImgId_str: types.maybeNull(types.string),
  commentCount: types.number,
})
