import storage from 'electron-json-storage'
import { isEmpty } from 'lodash'
import {
  types,
  Instance,
  onSnapshot,
  applySnapshot,
  SnapshotIn,
  castToSnapshot,
} from 'mobx-state-tree'

import { isDev } from '@/utils'

import { Platform, platform } from './Platform'
import { Player, player } from './Player'
import { View, view } from './View'

const RawRootStore = types.model('RawRootStore', {
  player: Player,
  view: View,
  platform: Platform,
})

type RawRootStoreSnapshot = SnapshotIn<typeof RawRootStore>

export const RootStore = types.snapshotProcessor(RawRootStore, {
  preProcessor(snapshot: RawRootStoreSnapshot) {
    snapshot.player.tracks?.forEach((track) => {
      track.playing = false
      track.currentTimeSetTimes = 0
    })

    return snapshot
  },
})

export const defaultSnapshot = {
  player,
  view: castToSnapshot(view),
  platform,
}

let initialized = false

export type RootStoreInstance = Instance<typeof RootStore>
export const rootStore: RootStoreInstance = RootStore.create(defaultSnapshot)

function getInitialSnapshot() {
  const snapshot = storage.getSync('app_state')
  return !isEmpty(snapshot) && RootStore.is(snapshot)
    ? snapshot
    : defaultSnapshot
}

function observeRootStore() {
  onSnapshot(rootStore, (snapshot) => {
    storage.set('app_state', snapshot, (err) => {
      if (err) throw err
    })
    // eslint-disable-next-line no-console
    if (isDev) console.log(snapshot)
  })
}

export function initRootStore() {
  if (initialized) return
  const snapshot = getInitialSnapshot()
  applySnapshot(rootStore, snapshot)
  observeRootStore()
  initialized = true
}
