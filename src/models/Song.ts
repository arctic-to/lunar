import { SnapshotOut, types } from 'mobx-state-tree'

export const Author = types.model({
  id: types.number,
  name: types.string,
  tns: types.array(types.frozen()),
  alias: types.array(types.frozen()),
})

export const Album = types.model({
  id: types.number,
  name: types.string,
  picUrl: types.string,
  tns: types.array(types.frozen()),
  pic_str: types.maybe(types.string),
  pic: types.number,
})

export const HML = types.model({
  br: types.number,
  fid: types.number,
  size: types.number,
  vd: types.number,
})

export const Privilege = types.model({
  id: types.number,
  fee: types.number,
  payed: types.number,
  st: types.number,
  pl: types.number,
  dl: types.number,
  sp: types.number,
  cp: types.number,
  subp: types.number,
  cs: types.boolean,
  maxbr: types.number,
  fl: types.number,
  toast: types.boolean,
  flag: types.number,
  preSell: types.boolean,
  playMaxbr: types.number,
  downloadMaxbr: types.number,
  freeTrialPrivilege: types.model({
    resConsumable: types.boolean,
    userConsumable: types.boolean,
  }),
  chargeInfoList: types.array(
    types.model({
      rate: types.number,
      chargeUrl: types.null,
      chargeMessage: types.null,
      chargeType: types.number,
    }),
  ),
})

export const Song = types.model({
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
  crbt: types.null,
  cf: types.string,
  al: Album,
  dt: types.number,
  h: HML,
  m: HML,
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
  originSongSimpleData: types.null,
  single: types.number,
  noCopyrightRcmd: types.null,
  rtype: types.number,
  rurl: types.null,
  mst: types.number,
  cp: types.number,
  mv: types.number,
  publishTime: types.number,
  reason: types.string,
  privilege: Privilege,
  alg: types.string,
})

export type SongSnapshot = SnapshotOut<typeof Song>
