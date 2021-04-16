import { types } from 'mobx-state-tree'

import { Album } from './Album'
import { Author } from './Author'
import { HML } from './HML'
import { NoCopyrightRcmd } from './NoCopyrightRcmd'
import { OriginSongSimpleData } from './OriginSongSimpleData'

export const Track = types.model('Track', {
  name: types.string,
  id: types.number,
  pst: types.number,
  t: types.number,
  ar: types.array(Author),
  alia: types.array(types.frozen()),
  pop: types.number,
  st: types.number,
  rt: types.maybeNull(types.string),
  fee: types.number,
  v: types.number,
  crbt: types.maybeNull(types.string),
  cf: types.string,
  al: Album,
  dt: types.number,
  h: types.maybeNull(HML),
  m: types.maybeNull(HML),
  l: types.maybeNull(HML),
  a: types.null,
  cd: types.string,
  no: types.number,
  rtUrl: types.null,
  ftype: types.number,
  rtUrls: types.array(types.frozen()),
  djId: types.number,
  copyright: types.number,
  s_id: types.number,
  mark: types.number,
  originCoverType: types.number,
  originSongSimpleData: types.maybeNull(OriginSongSimpleData),
  /** Add for `/song/detail` */
  resourceState: types.maybe(types.boolean),
  single: types.number,
  noCopyrightRcmd: types.maybeNull(NoCopyrightRcmd),
  mst: types.number,
  cp: types.number,
  mv: types.number,
  rtype: types.number,
  rurl: types.null,
  publishTime: types.number,
})
