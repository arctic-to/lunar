import { types } from 'mobx-state-tree'

export const Privilege = types.model('Privilege', {
  id: types.number,
  fee: types.number,
  payed: types.number,
  st: types.number,
  pl: types.number,
  dl: types.number,
  sp: types.number,
  cp: types.number, //copywrite
  subp: types.number,
  cs: types.boolean,
  maxbr: types.number,
  fl: types.number,
  toast: types.boolean,
  flag: types.number,
  preSell: types.boolean,
  playMaxbr: types.number,
  downloadMaxbr: types.number,
  /** Add for `/song/detail` */
  rscl: types.maybe(types.number),
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
