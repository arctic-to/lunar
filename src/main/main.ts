import { app, globalShortcut, ipcMain } from 'electron'
import debug from 'electron-debug'
import isDev from 'electron-is-dev'
import serve from 'electron-serve'

import { shortcutKeyMap, Renderer } from '../common'

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
  Object.entries(shortcutKeyMap).map(([shortcut, keys]) => {
    globalShortcut.register(keys.join('+'), () => {
      mainWin.webContents.send('shortcut:global', shortcut)
      lyricWin.webContents.send('shortcut:global', shortcut)
    })
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// fix transparent windows flicker on toggling visibility
// https://github.com/electron/electron/issues/12130#issuecomment-627198990
app.commandLine.appendSwitch('wm-window-animations-disabled')

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
