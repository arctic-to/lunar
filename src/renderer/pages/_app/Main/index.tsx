import type { AppProps /*, AppContext */ } from 'next/app'
import React, { useState, useCallback } from 'react'

import { Sash, SashContainer } from '@/components'
import { ScrollableAncestorContext } from '@/hooks'
import { useView } from '@/models'

import styles from './Main.module.scss'
import Shortcutbar from './Shortcutbar'
import Sidebar from './Sidebar'

export const Main: React.VFC<AppProps> = ({ Component, pageProps }) => {
  const [pane1, setPane1] = useState<HTMLDivElement | null>(null)
  const [pane2, setPane2] = useState<HTMLDivElement | null>(null)

  const view = useView()

  const handleMouseMove = useCallback(
    (pane1Width: number, pane2Width: number) => {
      view.sidebar.setWidth(pane2Width)
    },
    [view.sidebar],
  )

  return (
    <div className={styles.main}>
      <SashContainer>
        <Sash
          pane1={pane1}
          pane2={pane2}
          min={[600, view.sidebar.minWidth]}
          onMouseMove={handleMouseMove}
        />
      </SashContainer>
      <div className={styles.view_container}>
        <ScrollableAncestorContext.Provider value={pane1}>
          <div className={styles.component} ref={setPane1}>
            <Component {...pageProps} />
          </div>
        </ScrollableAncestorContext.Provider>
        <Sidebar ref={setPane2} />
        <Shortcutbar />
      </div>
    </div>
  )
}

export default Main
