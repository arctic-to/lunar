import { ipcRenderer } from 'electron'
import { getSnapshot } from 'mobx-state-tree'
import { useEffect } from 'react'

import { Renderer } from '@/../common'
import { globals } from '@/globals'
import { usePlayer } from '@/models'

function sendToLyricWindow(channel: string, ...args: any[]) {
  ipcRenderer.sendTo(
    globals.ipc.webContentsIds[Renderer.Lyric],
    channel,
    ...args,
  )
}

export function useIpc() {
  const player = usePlayer()

  useDependencyIpc()
  useActionIpc()

  useEffect(() => {
    if (player.osdLyric.show) {
      ipcRenderer.send('window:lyric:show')
    } else {
      ipcRenderer.send('window:lyric:hide')
    }
  }, [player.osdLyric.show])
}

function tryGetSnapshot(instance: any) {
  return instance && getSnapshot(instance)
}

function useDependencyIpc() {
  const player = usePlayer()

  useEffect(() => {
    ipcRenderer.on('lunar:initLyricState', () => {
      sendToLyricWindow('lunar:initLyricState', {
        song: tryGetSnapshot(player.track.song),
        currentTime: player.track.currentTime,
        playing: player.track.playing,
        order: player.order,
      })
    })

    return () => {
      ipcRenderer.removeAllListeners('lunar:initLyricState')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    sendToLyricWindow(
      'lunar:currentSongChange',
      tryGetSnapshot(player.track.song),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player.track.song?.url, player.track.song?.lyric])

  useEffect(() => {
    sendToLyricWindow('lunar:currentTimeChange', player.track.currentTime)
  }, [player.track.currentTime])

  useEffect(() => {
    sendToLyricWindow('lunar:playingChange', player.track.playing)
  }, [player.track.playing])

  useEffect(() => {
    sendToLyricWindow('lunar:orderChange', player.order)
  }, [player.order])
}

function useActionIpc() {
  const player = usePlayer()

  useEffect(() => {
    ipcRenderer
      .on('lunar:playPrev', player.playPrev)
      .on('lunar:play', player.track.play)
      .on('lunar:pause', player.track.pause)
      .on('lunar:playNext', player.playNext)
      .on('lunar:repeat', player.repeat)
      .on('lunar:shuffle', player.shuffle)
      .on('lunar:repeatOne', player.repeatOne)
      .on('lunar:hideLyric', player.osdLyric.toggle)

    return () => {
      ipcRenderer
        .removeAllListeners('lunar:playPrev')
        .removeAllListeners('lunar:play')
        .removeAllListeners('lunar:pause')
        .removeAllListeners('lunar:playNext')
        .removeAllListeners('lunar:repeat')
        .removeAllListeners('lunar:shuffle')
        .removeAllListeners('lunar:repeatOne')
        .removeAllListeners('lunar:hideLyric')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
