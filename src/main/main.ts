import { app, ipcMain } from 'electron'
import debug from 'electron-debug'
import isDev from 'electron-is-dev'
import serve from 'electron-serve'

import { createMainWindow, createLyricWindow } from './windows'

if (isDev) {
  debug()
} else {
  serve({ directory: 'build' })
}

app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.once('lyric:create', (_, player) => {
  createLyricWindow(player)
})
