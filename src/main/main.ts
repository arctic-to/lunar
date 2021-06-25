import { app, ipcMain } from 'electron'
import debug from 'electron-debug'
import isDev from 'electron-is-dev'
import serve from 'electron-serve'

import { createMainWindow, createLyricWindow } from './windows'

let mainWin: Electron.BrowserWindow | null = null
let lyricWin: Electron.BrowserWindow | null = null

if (isDev) {
  debug()
} else {
  serve({ directory: 'build' })
}

app.on('ready', () => {
  mainWin = createMainWindow()
  mainWin.once('closed', () => (mainWin = null))
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.once('window:lyric:create', (_, playerSnapshot) => {
  lyricWin = createLyricWindow(playerSnapshot)
  lyricWin.once('closed', () => (lyricWin = null))

  lyricWin.on('moved', () => {
    mainWin?.webContents.send('window:lyric:move', lyricWin?.getBounds())
  })

  lyricWin.on('resized', () => {
    mainWin?.webContents.send('window:lyric:resize', lyricWin?.getBounds())
  })

  ipcMain.on('window:lyric:show', () => lyricWin?.show())
  ipcMain.on('window:lyric:hide', () => lyricWin?.hide())

  ipcMain.on('window:main:patch', (_, patch) => {
    lyricWin?.webContents.send('window:main:patch', patch)
  })

  ipcMain.on('window:main:action', (_, action) => {
    lyricWin?.webContents.send('window:main:action', action)
  })

  ipcMain.on('window:lyric:action', (_, action) => {
    mainWin?.webContents.send('window:lyric:action', action)
  })
})
