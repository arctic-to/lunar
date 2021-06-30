import { BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'

export function createMainWindow() {
  const win = new BrowserWindow({
    width: isDev ? 1600 : 1200,
    minWidth: 1000,
    height: 800,
    frame: false,
    opacity: 220 / 255,
    // https://github.com/GetScatter/ScatterDesktop/blob/63701f48dc4597732b6a446c15e90a66fbfa7989/electron/utils.js
    icon: isDev
      ? 'src/renderer/public/favicon.dev.png'
      : __dirname + '/../../favicon.png',
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
