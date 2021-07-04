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
  playMaxbr: types.maybe(types.number),
  downloadMaxbr: types.maybe(types.number),
  /** Add for `/song/detail` */
  rscl: types.maybeNull(types.maybe(types.number)),
  freeTrialPrivilege: types.maybe(
    types.model({
      resConsumable: types.boolean,
      userConsumable: types.boolean,
    }),
  ),
  chargeInfoList: types.maybeNull(
    types.array(
      types.model({
        rate: types.number,
        chargeUrl: types.null,
        chargeMessage: types.null,
        chargeType: types.number,
      }),
    ),
  ),
})
