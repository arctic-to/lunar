import type { AppProps /*, AppContext */ } from 'next/app'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { Sash, SashContainer } from '@/components'
import { RootStoreContext, initRootStore, rootStore } from '@/models'

import styles from './App.module.scss'
import {
  Header,
  PlayPanel,
  Sidebar,
  Shortcutbar,
  Statusbar,
} from './components'

import './globals.scss'

const pagesWithoutLayout = ['/lyric']

function MyApp({ Component, pageProps }: AppProps) {
  const [pane1, setPane1] = useState<HTMLDivElement | null>(null)
  const [pane2, setPane2] = useState<HTMLDivElement | null>(null)

  const { pathname } = useRouter()
  const withoutLayout = pagesWithoutLayout.includes(pathname)

  useEffect(() => {
    initRootStore()
  }, [])

  return (
    <RootStoreContext.Provider value={rootStore}>
      {withoutLayout ? (
        <Component {...pageProps} />
      ) : (
        <>
          <Header />
          <div className={styles.main}>
            <SashContainer>
              <Sash pane1={pane1} pane2={pane2} min={[400, 240]} />
            </SashContainer>
            <div className={styles.view_container}>
              <div className={styles.component} ref={setPane1}>
                <Component {...pageProps} />
              </div>
              <Sidebar ref={setPane2} />
              <Shortcutbar />
            </div>
          </div>
          <PlayPanel />
          <Statusbar />
        </>
      )}
    </RootStoreContext.Provider>
  )
}

export default MyApp
