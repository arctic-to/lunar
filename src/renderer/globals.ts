import { Renderer } from '../common'

declare global {
  interface Window {
    ipc: {
      webContentsIds: Record<Renderer, number>
    }
  }
}

export const globals = {
  get ipc() {
    return window.ipc
  },
}
