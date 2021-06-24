import c from 'classnames'
import { ipcRenderer, remote } from 'electron'
import { inRange } from 'lodash'
import { observer } from 'mobx-react-lite'
import { applyAction, ISerializedActionCall, onAction } from 'mobx-state-tree'
import React, { useEffect, useState } from 'react'

import { __LYRIC__PROCESS__ } from '@/ipc'
import { usePlayer } from '@/models'

import Fallback from './Fallback'
import Header from './Header'
import Lyric from './Lyric'
import styles from './OsdLyric.module.scss'

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

  useEffect(() => {
    window.document.body.className = c(styles.body, {
      [styles.hover]: hovering,
    })
  }, [hovering])

  const canRenderLyric = parsedLyrics && !noTimestamp

  return (
    <div className={styles.container}>
      <Header hidden={!hovering} />
      <div className={styles.main}>
        {canRenderLyric ? (
          <Lyric parsedLyric={parsedLyrics!} />
        ) : (
          <Fallback song={song} />
        )}
      </div>
    </div>
  )
})

export default OsdLyric
