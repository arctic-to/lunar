import { ipcRenderer } from 'electron'

import { Renderer } from '../common'

const ipc = {
  webContentsIds: ipcRenderer.sendSync('lunar:getWebcontentsIds') as Record<
    Renderer,
    number
  >,
}

// @ts-ignore
window.ipc = ipc
