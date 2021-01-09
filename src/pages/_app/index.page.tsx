import type { AppProps /*, AppContext */ } from 'next/app'
import { useEffect } from 'react'

import { RootStoreContext, initRootStore, rootStore } from '@/models'

import styles from './App.module.scss'
import { Header, PlayPanel, Sidebar, Actionbar, Statusbar } from './components'
import './globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initRootStore()
  }, [])

  return (
    <RootStoreContext.Provider value={rootStore}>
      <Header />
      <div className={styles.main}>
        <div className={styles.component}>
          <Component {...pageProps} />
        </div>
        <Sidebar />
        <Actionbar />
      </div>
      <PlayPanel />
      <Statusbar />
    </RootStoreContext.Provider>
  )
}

export default MyApp
