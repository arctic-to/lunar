import { remote } from 'electron'
import { observer } from 'mobx-react-lite'
import { onPatch } from 'mobx-state-tree'
import { useState, useEffect } from 'react'

import { usePlayer, useStore } from '@/models'

export const Lyric: React.VFC = observer(() => {
  const [win, setWin] = useState<Electron.BrowserWindow | null>(null)
  const rootStore = useStore()
  const { lyric } = usePlayer()

  useEffect(() => {
    if (!lyric.opened) return
    setWin(
      new remote.BrowserWindow({
        ...lyric.bounds,
        frame: false,
        acceptFirstMouse: true,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true,
          devTools: false,
        },
      }),
    )
  }, [lyric.bounds, lyric.opened])

  useEffect(() => {
    if (lyric.opened) return
    win?.close()
    setWin(null)
  }, [lyric.opened, win])

  useEffect(() => {
    win?.loadURL('http://localhost:3000/lyric')

    win?.on('moved', () => {
      if (win) lyric.setBounds(win.getBounds())
    })

    return onPatch(rootStore, (patch) => {
      win?.webContents.send('patch', patch)
    })
  }, [lyric, rootStore, win])

  return null
})

export default Lyric
