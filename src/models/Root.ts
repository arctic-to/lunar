import {
  types,
  Instance,
  onSnapshot,
  applySnapshot,
  SnapshotIn,
} from 'mobx-state-tree'

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
  view,
  platform,
}

let initialized = false
export const rootStore = RootStore.create(defaultSnapshot)

function getInitialSnapshot() {
  const serializedSnapshot = localStorage.getItem('rootStore')
  if (!serializedSnapshot) return defaultSnapshot
  const json = JSON.parse(serializedSnapshot)
  if (!RootStore.is(json)) return defaultSnapshot
  return json
}

export function initRootStore() {
  if (initialized) return
  const snapshot = getInitialSnapshot()
  applySnapshot(rootStore, snapshot)
  observeRootStore()
  initialized = true
}

export function observeRootStore() {
  onSnapshot(rootStore, (snapshot) => {
    // eslint-disable-next-line no-console
    console.log('Snapshot: ', snapshot)
    localStorage.setItem('rootStore', JSON.stringify(snapshot))
  })
}

export type RootStoreInstance = Instance<typeof RootStore>
