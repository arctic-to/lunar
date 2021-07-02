import { ipcRenderer } from 'electron'
import { useMemo } from 'react'
import { useEffect } from 'react'

import { GlobalShortcut } from '@/../common'
import { useLike } from '@/data'
import { usePlayer } from '@/models'

export function useShortcut() {
  useGlobalShortcut()
}

function useGlobalShortcut() {
  const { track, playPrev, playNext, osdLyric } = usePlayer()
  const [like] = useLike(track.song?.id)
  const { turnDownVolume, turnUpVolume, toggle } = track

  const actionMap = useMemo(
    () => ({
      [GlobalShortcut.Like]: like,
      [GlobalShortcut.PlayPrev]: playPrev,
      [GlobalShortcut.PlayNext]: playNext,
      [GlobalShortcut.TurnDownVolume]: turnDownVolume,
      [GlobalShortcut.TurnUpVolume]: turnUpVolume,
      [GlobalShortcut.Toggle]: toggle,
      [GlobalShortcut.ToggleOsdLyric]: osdLyric.toggle,
      [GlobalShortcut.ToggleOsdLyricTranslation]: undefined,
      [GlobalShortcut.ToggleOsdLyricPhonetic]: undefined,
    }),
    [
      like,
      osdLyric.toggle,
      playNext,
      playPrev,
      toggle,
      turnDownVolume,
      turnUpVolume,
    ],
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
