import { app, BrowserWindow } from 'electron'

let win: BrowserWindow | null = null
function createWindow() {
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
    },
  })

  const urlLocation = 'http://localhost:3000'

  win.loadURL(urlLocation)

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
