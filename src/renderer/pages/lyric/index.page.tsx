import c from 'classnames'
import { remote } from 'electron'
import { inRange } from 'lodash'
import React, { useEffect, useState } from 'react'

import Header from './Header'
import Lyric from './Lyric'
import lyricStyles from './Lyric/Lyric.module.scss'
import styles from './OsdLyric.module.scss'
import { useDependencyIpc } from './ipc'
import { useGlobalShortcut } from './shortcut'
import { LyricStoreContext, useCreateLyricStore } from './store'

export const OsdLyric: React.VFC = () => {
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

  // fix: Prop `className` did not match.
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
          <div className={lyricStyles.lyric_container}>
            <span className={lyricStyles.lyric}>
              {store.song?.title || 'No songs in the track.'}
            </span>
          </div>
          {canRenderLyric && <Lyric parsedLyrics={parsedLyrics!} />}
        </div>
      </div>
    </LyricStoreContext.Provider>
  )
}

export default OsdLyric
