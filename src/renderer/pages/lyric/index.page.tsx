import c from 'classnames'
import { remote } from 'electron'
import { inRange } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'

import Fallback from './Fallback'
import Header from './Header'
import Lyric from './Lyric'
import styles from './OsdLyric.module.scss'
import { useDependencyIpc } from './ipc'
import { useGlobalShortcut } from './shortcut'
import { LyricStoreContext, useCreateLyricStore } from './store'

export const OsdLyric: React.VFC = observer(() => {
  const [hovering, setHovering] = useState(false)
  const store = useCreateLyricStore()

  const { parsedLyrics, noTimestamp } = store.song?.lyric ?? {}

  const initialized = useDependencyIpc(store)
  useGlobalShortcut(store)

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
  const displayOverlay = store.overlay || hovering

  if (!initialized) return null

  return (
    <LyricStoreContext.Provider value={store}>
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
            <Fallback />
          )}
        </div>
      </div>
    </LyricStoreContext.Provider>
  )
})

export default OsdLyric
