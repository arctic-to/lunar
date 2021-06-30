import { remote } from 'electron'
import React, { useCallback, useEffect, useState } from 'react'
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscChromeRestore,
  VscChromeClose,
} from 'react-icons/vsc'

import Button from '../components/Button'

import styles from './WindowOperations.module.scss'

export default function WindowOperations() {
  const [win, setWin] = useState<Electron.BrowserWindow | null>(null)
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    setWin(remote.getCurrentWindow())
  }, [])

  useEffect(() => {
    win?.on('maximize', () => setIsMaximized(true))
    win?.on('unmaximize', () => setIsMaximized(false))

    return () => {
      win?.removeAllListeners('maximize')
      win?.removeAllListeners('unmaximize')
    }
  }, [win])

  useEffect(() => {
    if (win) setIsMaximized(win.isMaximized())
  }, [win])

  const minimize = useCallback(() => {
    win?.minimize()
  }, [win])

  const maximize = useCallback(() => {
    isMaximized ? win?.restore() : win?.maximize()
  }, [win, isMaximized])

  const close = useCallback(() => {
    win?.close()
  }, [win])

  return (
    <div className={styles.container}>
      <Button onClick={minimize}>
        <VscChromeMinimize size={16} />
      </Button>
      <Button onClick={maximize}>
        {isMaximized ? (
          <VscChromeRestore size={16} />
        ) : (
          <VscChromeMaximize size={16} />
        )}
      </Button>
      <Button className={styles.close} onClick={close}>
        <VscChromeClose size={16} />
      </Button>
    </div>
  )
}
