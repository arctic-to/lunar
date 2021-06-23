import { BrowserWindow, ipcMain } from 'electron'
import isDev from 'electron-is-dev'

let win: BrowserWindow | null = null

export function createLyricWindow(playerSnapshot: any) {
  win = new BrowserWindow({
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
      // https://github.com/electron/electron/issues/28034#issuecomment-792871937
      contextIsolation: false,
      // devTools: false,
    },
  })

  win.loadURL(isDev ? 'http://localhost:3000/lyric' : 'app://./lyric.html')

  win.on('closed', () => {
    win = null
  })

  win.once('ready-to-show', () => {
    /**
     * The window who is not ready to show will not receive messages.
     */
    win?.webContents.send('store:player:init', playerSnapshot)
  })

  ipcMain.on('window:lyric:show', () => win?.show())
  ipcMain.on('window:lyric:hide', () => win?.hide())

  ipcMain.on('window:main:action', (_, action) => {
    win?.webContents.send('window:main:action', action)
  })
}
