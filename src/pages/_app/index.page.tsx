import type { AppProps /*, AppContext */ } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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
            <div className={styles.component}>
              <Component {...pageProps} />
            </div>
            <Sidebar />
            <Shortcutbar />
          </div>
          <PlayPanel />
          <Statusbar />
        </>
      )}
    </RootStoreContext.Provider>
  )
}

export default MyApp
