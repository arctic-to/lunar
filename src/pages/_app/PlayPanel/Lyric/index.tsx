import { remote } from 'electron'
import { observer } from 'mobx-react-lite'
import { getSnapshot, onAction } from 'mobx-state-tree'
import { useState, useEffect, useCallback } from 'react'

import { usePlayer } from '@/models'

export const Lyric: React.VFC = observer(() => {
  const [win, setWin] = useState<Electron.BrowserWindow | null>(null)
  const player = usePlayer()
  const { lyric } = usePlayer()

  const updateBounds = useCallback(() => {
    if (win) lyric.setBounds(win.getBounds())
  }, [lyric, win])

  useEffect(() => {
    if (win) return
    const _win = new remote.BrowserWindow({
      ...lyric.bounds,
      frame: false,
      acceptFirstMouse: true,
      fullscreenable: false,
      minimizable: false,
      maximizable: false,
      transparent: true,
      alwaysOnTop: true,
      skipTaskbar: true,
      show: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        devTools: false,
      },
    })
    _win.loadURL('http://localhost:3000/lyric')
    setWin(_win)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    lyric.opened ? win?.show() : win?.hide()
  }, [lyric.opened, win])

  useEffect(() => {
    win?.on('moved', updateBounds)
    win?.on('resized', updateBounds)
  }, [updateBounds, win])

  useEffect(() => {
    /**
     * The window who is not ready to show will not receive messages.
     */
    win?.on('ready-to-show', () => {
      win?.webContents.send('store:player:init', getSnapshot(player))
    })
  }, [player, win?.webContents, win])

  useEffect(() => {
    return onAction(player, (action) => {
      /**
       * Variables store time (like `currentTime`) should be calculated by other
       * variables, instead of sync them.
       */
      const excludedActions = ['_setCurrentTime', 'setTimeoutID']
      if (!excludedActions.includes(action.name)) {
        win?.webContents.send('store:player:action', action)
      }
    })
  }, [player, win?.webContents])

  return null
})

export default Lyric
