import c from 'classnames'
import { ipcRenderer, remote } from 'electron'
import { inRange } from 'lodash'
import { observer } from 'mobx-react-lite'
import {
  applyAction,
  applySnapshot,
  ISerializedActionCall,
} from 'mobx-state-tree'
import React, { useEffect, useMemo, useState } from 'react'

import { useLyric } from '@/data'
import { useCurrentTrack, usePlayer, PlayerSnapshotOut } from '@/models'
import { parseLyric } from '@/utils'

import Header from './Header'
import { Lyric } from './Lyric'
import styles from './OsdLyric.module.scss'

export const OsdLyric: React.VFC = observer(() => {
  const [hovering, setHovering] = useState(false)
  const player = usePlayer()
  const currentTrack = useCurrentTrack()
  const { data } = useLyric(currentTrack?.song.id ?? null)

  useEffect(() => {
    ipcRenderer.on(
      'store:player:init',
      (event, playerSnapshot: PlayerSnapshotOut) => {
        applySnapshot(player, playerSnapshot)
      },
    )
  }, [player])

  useEffect(() => {
    ipcRenderer.on(
      'window:main:action',
      (event, action: ISerializedActionCall) => {
        applyAction(player, action)
      },
    )
  }, [player])

  useEffect(() => {
    if (!currentTrack) return
    currentTrack.playing
      ? currentTrack.currentTimeObserver(100)()
      : currentTrack.unobserveCurrentTime()
  }, [currentTrack, currentTrack?.playing])

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

  const result = useMemo(() => {
    if (data && !data.nolyric && !data.uncollected) return parseLyric(data)
  }, [data])

  const { parsedLyric, noTimestamp } = result || {}

  return (
    <div className={styles.container}>
      <Header hidden={!hovering} />
      {!parsedLyric || noTimestamp ? (
        <div>{currentTrack?.song.name}</div>
      ) : (
        <Lyric parsedLyric={parsedLyric} />
      )}
    </div>
  )
})

export default OsdLyric
