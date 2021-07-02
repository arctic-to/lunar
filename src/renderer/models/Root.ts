import Store from 'electron-store'
import { isEmpty } from 'lodash'
import {
  types,
  Instance,
  onSnapshot,
  applySnapshot,
  castToSnapshot,
  SnapshotOut,
} from 'mobx-state-tree'

import { isDev } from '@/utils'

import { Platform, platform } from './Platform'
import { Player, player } from './Player'
import { View, view } from './View'

const store = new Store<RootStoreSnapshot>({
  name: isDev ? 'app_state.dev' : 'app_state',
})

const RootStore = types.model('RootStore', {
  player: Player,
  view: View,
  platform: Platform,
})

export const defaultSnapshot = {
  player,
  view: castToSnapshot(view),
  platform,
}

let initialized = false

export type RootStoreSnapshot = SnapshotOut<typeof RootStore>
export type RootStoreInstance = Instance<typeof RootStore>
export const rootStore: RootStoreInstance = RootStore.create(defaultSnapshot)

function getInitialSnapshot() {
  const snapshot = store.store
  if (!isEmpty(snapshot) && RootStore.is(snapshot)) {
    snapshot.player.track.playing = false
    return snapshot
  } else {
    return defaultSnapshot
  }
}

function observeRootStore() {
  onSnapshot(rootStore, (snapshot) => {
    store.store = snapshot
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
