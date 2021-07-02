import { BrowserWindow } from 'electron'
import isDev from 'electron-is-dev'

import { store } from '../store'

export function createMainWindow() {
  const main = store.get('main')

  const win = new BrowserWindow({
    ...main?.bounds,
    minWidth: 1000,
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
      preload: __dirname + '/../preload.js', // https://stackoverflow.com/a/56446019/13151903
    },
  })

  win.loadURL(isDev ? 'http://localhost:3000' : 'app://./index.html')

  return win
}
