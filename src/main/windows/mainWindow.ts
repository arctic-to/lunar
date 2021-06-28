import { BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'

export function createMainWindow() {
  const win = new BrowserWindow({
    width: 1600,
    minWidth: 1000,
    height: 800,
    frame: false,
    opacity: 220 / 255,
    icon: 'public/favicon.ico',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false, // https://github.com/electron/electron/issues/28034#issuecomment-792871937
      webSecurity: false, //https://github.com/electron/electron/issues/13528#issuecomment-415360209
    },
  })

  win.loadURL(isDev ? 'http://localhost:3000' : 'app://./index.html')

  return win
}
