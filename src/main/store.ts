import isDev from 'electron-is-dev'
import Store from 'electron-store'

interface WindowState {
  main: {
    bounds: Electron.Rectangle
  }
  lyric: {
    bounds: Electron.Rectangle
    show: boolean
  }
}

export type WindowStore = typeof store
export const store = new Store<WindowState>({
  name: isDev ? 'window_state.dev' : 'window_state',
})
