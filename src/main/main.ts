import { app, globalShortcut, ipcMain } from 'electron'
import debug from 'electron-debug'
import isDev from 'electron-is-dev'
import serve from 'electron-serve'

import { acceleratorMap, Renderer } from '../common'

import { store } from './store'
import { createMainWindow, createLyricWindow } from './windows'

let mainWin: Electron.BrowserWindow | null = null
let lyricWin: Electron.BrowserWindow | null = null

if (isDev) {
  debug()
} else {
  serve({ directory: 'build' })
}

const updateMainWindowBounds = () => {
  store.set('main.bounds', mainWin.getBounds())
}
const updateLyricWindowBounds = () => {
  store.set('lyric.bounds', lyricWin.getBounds())
}

app.on('ready', () => {
  // main window
  mainWin = createMainWindow()
  mainWin.on('close', () => lyricWin.close())
  mainWin.once('closed', () => (mainWin = null))
  mainWin.on('moved', updateMainWindowBounds)
  mainWin.on('resized', updateMainWindowBounds)

  // lyric window
  lyricWin = createLyricWindow()
  lyricWin.once('closed', () => (lyricWin = null))
  lyricWin.on('moved', updateLyricWindowBounds)
  lyricWin.on('resized', updateLyricWindowBounds)

  // register global shortcuts
  Object.entries(acceleratorMap).map(([key, accelerator]) => {
    globalShortcut.register(accelerator, () => {
      mainWin.webContents.send('shortcut:global', key)
      lyricWin.webContents.send('shortcut:global', key)
    })
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('window:lyric:show', () => {
  store.set('lyric.show', true)
  lyricWin.show()
})
ipcMain.on('window:lyric:hide', () => {
  store.set('lyric.show', false)
  lyricWin.hide()
})

ipcMain.on('lunar:getWebcontentsIds', (event) => {
  event.returnValue = {
    [Renderer.Main]: mainWin.webContents.id,
    [Renderer.Lyric]: lyricWin.webContents.id,
  }
})
