import { types } from 'mobx-state-tree'

import { Profile } from './Profile'

export const ArtistDetail = types.model('ArtistDetail', {
  videoCount: types.number,
  vipRights: types.null,
  identify: types.model({
    imageUrl: types.string,
    imageDesc: types.string,
    actionUrl: types.string,
  }),
  artist: types.model({
    id: types.number,
    cover: types.string,
    name: types.string,
    transNames: types.array(types.string),
    identities: types.array(types.undefined),
    identifyTag: types.array(types.string),
    briefDesc: types.string,
    rank: types.model({
      rank: types.number,
      type: types.number,
    }),
    albumSize: types.number,
    musicSize: types.number,
    mvSize: types.number,
  }),
  blacklist: types.boolean,
  preferShow: types.null,
  showPriMsg: types.boolean,
  eventCount: types.number,
  user: types.maybe(Profile),
})
