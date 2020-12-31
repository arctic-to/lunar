import { remote } from 'electron'
import { useCallback, useEffect, useState } from 'react'
import {
  VscChromeMinimize,
  VscChromeMaximize,
  VscChromeRestore,
  VscChromeClose,
} from 'react-icons/vsc'

import styles from './WindowOperations.module.scss'

export default function WindowOperations() {
  const [win, setWin] = useState<Electron.BrowserWindow | null>(null)
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    setWin(remote.BrowserWindow.getFocusedWindow())
  }, [])

  useEffect(() => {
    win?.on('maximize', () => setIsMaximized(true))
    win?.on('unmaximize', () => setIsMaximized(false))
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
    <div className={styles['window-operations']}>
      <button className={styles.minimize} onClick={minimize}>
        <VscChromeMinimize size={16} />
      </button>
      <button className={styles.maximize} onClick={maximize}>
        {isMaximized ? (
          <VscChromeRestore size={16} />
        ) : (
          <VscChromeMaximize size={16} />
        )}
      </button>
      <button className={styles.close} onClick={close}>
        <VscChromeClose size={16} />
      </button>
    </div>
  )
}
