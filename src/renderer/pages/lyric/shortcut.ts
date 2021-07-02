import { ipcRenderer } from 'electron'
import { useEffect, useMemo } from 'react'

import { GlobalShortcut } from '@/../common'

import { LyricStore } from './store'

export function useGlobalShortcut(store: LyricStore) {
  const actionMap = useMemo(
    () => ({
      [GlobalShortcut.Like]: undefined,
      [GlobalShortcut.PlayPrev]: undefined,
      [GlobalShortcut.PlayNext]: undefined,
      [GlobalShortcut.TurnDownVolume]: undefined,
      [GlobalShortcut.TurnUpVolume]: undefined,
      [GlobalShortcut.Toggle]: undefined,
      [GlobalShortcut.ToggleOsdLyric]: undefined,
      [GlobalShortcut.ToggleOsdLyricTranslation]: store.toggleTranslation,
      [GlobalShortcut.ToggleOsdLyricPhonetic]: store.togglePhonetic,
    }),
    [store.togglePhonetic, store.toggleTranslation],
  )

  useEffect(() => {
    ipcRenderer.on('shortcut:global', (event, shortcut: GlobalShortcut) => {
      actionMap[shortcut]?.()
    })
    return () => {
      ipcRenderer.removeAllListeners('shortcut:global')
    }
  }, [actionMap])
}
