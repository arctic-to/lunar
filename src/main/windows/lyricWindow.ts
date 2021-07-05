import { BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'

import { store } from '../store'

export function createLyricWindow() {
  const lyric = store.get('lyric')

  const win = new BrowserWindow({
    ...lyric?.bounds,
    frame: false,
    acceptFirstMouse: true,
    fullscreenable: false,
    minimizable: false, // hide DisplayFusion icon
    maximizable: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: false, // hide in alt+tab
    show: lyric?.show,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false, // https://github.com/electron/electron/issues/28034#issuecomment-792871937
      preload: __dirname + '/../preload.js', //https://stackoverflow.com/a/56446019/13151903
    },
  })

  win.loadURL(isDev ? 'http://localhost:3000/lyric' : 'app://./lyric.html')

  return win
}
