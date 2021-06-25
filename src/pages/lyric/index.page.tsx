import c from 'classnames'
import { ipcRenderer, remote } from 'electron'
import { inRange } from 'lodash'
import { observer } from 'mobx-react-lite'
import {
  applyAction,
  applyPatch,
  IJsonPatch,
  ISerializedActionCall,
  onAction,
} from 'mobx-state-tree'
import React, { useEffect, useState } from 'react'

import { Renderer, __LYRIC__PROCESS__ } from '@/ipc'
import { usePlayer } from '@/models'

import Fallback from './Fallback'
import Header from './Header'
import Lyric from './Lyric'
import styles from './OsdLyric.module.scss'

process.env.RENDERER = Renderer.Lyric

export const OsdLyric: React.VFC = observer(() => {
  const [hovering, setHovering] = useState(false)
  const player = usePlayer()
  const { lyricStore, song } = player.currTrack ?? {}
  const { parsedLyrics, noTimestamp } = lyricStore ?? {}

  useEffect(() => {
    return onAction(player, (action) => {
      const isAcceptable = action.name.startsWith(__LYRIC__PROCESS__)
      if (isAcceptable) {
        ipcRenderer.send('window:lyric:action', action)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    ipcRenderer.on('window:main:patch', (event, patch: IJsonPatch) => {
      applyPatch(player, patch)
    })
    ipcRenderer.on(
      'window:main:action',
      (event, action: ISerializedActionCall) => {
        applyAction(player, action)
      },
    )
  }, [player])

  useEffect(() => {
    const win = remote.getCurrentWindow()
    setInterval(() => {
      const bounds = win.getBounds()
      const point = remote.screen.getCursorScreenPoint()
      setHovering(
        inRange(point.x, bounds.x, bounds.x + bounds.width) &&
          inRange(point.y, bounds.y, bounds.y + bounds.height),
      )
    })
  }, [])

  const canRenderLyric = parsedLyrics && !noTimestamp
  const displayOverlay = player.lyric.overlay || hovering

  return (
    <div
      className={c(styles.body, styles.container, {
        [styles.overlay]: displayOverlay,
      })}
    >
      <Header hovering={hovering} />
      <div className={styles.main}>
        {canRenderLyric ? (
          <Lyric parsedLyrics={parsedLyrics!} />
        ) : (
          <Fallback song={song} />
        )}
      </div>
    </div>
  )
})

export default OsdLyric
