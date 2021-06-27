import { BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'

export function createLyricWindow(playerSnapshot: any) {
  const win = new BrowserWindow({
    ...playerSnapshot.lyric.bounds,
    frame: false,
    acceptFirstMouse: true,
    fullscreenable: false,
    minimizable: false,
    maximizable: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    show: playerSnapshot.lyric.show,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false, // https://github.com/electron/electron/issues/28034#issuecomment-792871937
      partition: 'persist: rootStore', // https://github.com/electron/electron/issues/24365#issuecomment-688494227
    },
  })

  win.loadURL(isDev ? 'http://localhost:3000/lyric' : 'app://./lyric.html')

  return win
}
