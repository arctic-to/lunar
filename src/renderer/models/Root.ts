import storage from 'electron-json-storage'
import { isEmpty } from 'lodash'
import {
  types,
  Instance,
  onSnapshot,
  applySnapshot,
  castToSnapshot,
} from 'mobx-state-tree'

import { isDev } from '@/utils'

import { Platform, platform } from './Platform'
import { Player, player } from './Player'
import { View, view } from './View'

const STORE_FILE = isDev ? 'app_state.dev' : 'app_state'

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

export type RootStoreInstance = Instance<typeof RootStore>
export const rootStore: RootStoreInstance = RootStore.create(defaultSnapshot)

function getInitialSnapshot() {
  const snapshot = storage.getSync(STORE_FILE)
  if (!isEmpty(snapshot) && RootStore.is(snapshot)) {
    snapshot.player.track.playing = false
    return snapshot
  } else {
    return defaultSnapshot
  }
}

function observeRootStore() {
  onSnapshot(rootStore, (snapshot) => {
    storage.set(STORE_FILE, snapshot, (err) => {
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
