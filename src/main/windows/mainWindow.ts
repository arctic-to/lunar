import { BrowserWindow, ipcMain } from 'electron'
import isDev from 'electron-is-dev'

let win: BrowserWindow | null = null

export function createMainWindow() {
  win = new BrowserWindow({
    width: 1600,
    minWidth: 1000,
    height: 800,
    frame: false,
    opacity: 220 / 255,
    icon: 'public/favicon.ico',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      // https://github.com/electron/electron/issues/28034#issuecomment-792871937
      contextIsolation: false,
    },
  })

  win.loadURL(isDev ? 'http://localhost:3000' : 'app://./index.html')

  win.on('closed', () => {
    win = null
  })

  ipcMain.on('window:action:lyric', (_, action) => {
    win?.webContents.send('window:action:lyric', action)
  })
}
