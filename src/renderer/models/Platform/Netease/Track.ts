import { types } from 'mobx-state-tree'

import { Album } from './Album'
import { Artist } from './Artist'
import { HML } from './HML'
import { NoCopyrightRcmd } from './NoCopyrightRcmd'
import { OriginSongSimpleData } from './OriginSongSimpleData'

export const Track = types.model('Track', {
  a: types.null,
  al: Album,
  alia: types.array(types.frozen()),
  ar: types.array(Artist),
  cd: types.string,
  cf: types.string,
  copyright: types.maybe(types.number),
  cp: types.number,
  crbt: types.maybeNull(types.string),
  djId: types.number,
  dt: types.number,
  fee: types.number,
  ftype: types.number,
  h: types.maybeNull(HML),
  id: types.identifierNumber,
  l: types.maybeNull(HML),
  m: types.maybeNull(HML),
  mark: types.maybe(types.number),
  mst: types.number,
  mv: types.number,
  name: types.string,
  no: types.number,
  noCopyrightRcmd: types.maybeNull(NoCopyrightRcmd),
  originCoverType: types.maybe(types.number),
  originSongSimpleData: types.maybeNull(OriginSongSimpleData),
  pop: types.number,
  pst: types.number,
  publishTime: types.maybe(types.number),
  /** Add for `/song/detail` */
  resourceState: types.maybe(types.boolean),
  rt: types.maybeNull(types.string),
  rtUrl: types.null,
  rtUrls: types.array(types.frozen()),
  rtype: types.number,
  rurl: types.null,
  s_id: types.maybe(types.number),
  single: types.maybe(types.number),
  st: types.number,
  t: types.number,
  v: types.number,
})
