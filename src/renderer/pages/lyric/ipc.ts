import { ipcRenderer } from 'electron'
import { useCallback, useEffect, useState } from 'react'

import { Renderer } from '@/../common'
import { globals } from '@/globals'

import { LyricStore } from './store'

export function sendToMainWindow(channel: string, ...args: any[]) {
  ipcRenderer.sendTo(
    globals.ipc.webContentsIds[Renderer.Main],
    channel,
    ...args,
  )
}

export function useDependencyIpc(store: LyricStore) {
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    sendToMainWindow('lunar:initLyricState')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    ipcRenderer
      .on('lunar:initLyricState', (event, state) => {
        store.setSong(state.song)
        store.setCurrentTime(state.currentTime)
        store.setPlaying(state.playing)
        store.setOrder(state.order)
        setInitialized(true)
      })
      .on('lunar:currentSongChange', (event, song) => {
        store.setSong(song)
      })
      .on('lunar:currentTimeChange', (event, currentTime) => {
        store.setCurrentTime(currentTime)
      })
      .on('lunar:playingChange', (event, playing) => {
        store.setPlaying(playing)
      })
      .on('lunar:orderChange', (event, order) => {
        store.setOrder(order)
      })

    return () => {
      ipcRenderer
        .removeAllListeners('lunar:initLyricState')
        .removeAllListeners('lunar:currentSongChange')
        .removeAllListeners('lunar:currentTimeChange')
        .removeAllListeners('lunar:playingChange')
        .removeAllListeners('lunar:orderChange')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return initialized
}

export function useActionIpc() {
  return {
    playPrev: useCallback(() => {
      sendToMainWindow('lunar:playPrev')
    }, []),
    play: useCallback(() => {
      sendToMainWindow('lunar:play')
    }, []),
    pause: useCallback(() => {
      sendToMainWindow('lunar:pause')
    }, []),
    playNext: useCallback(() => {
      sendToMainWindow('lunar:playNext')
    }, []),
    repeat: useCallback(() => {
      sendToMainWindow('lunar:repeat')
    }, []),
    shuffle: useCallback(() => {
      sendToMainWindow('lunar:shuffle')
    }, []),
    repeatOne: useCallback(() => {
      sendToMainWindow('lunar:repeatOne')
    }, []),
    hideLyric: useCallback(() => {
      sendToMainWindow('lunar:hideLyric')
    }, []),
  }
}
