import type { AppProps /*, AppContext */ } from 'next/app'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { RootStoreContext, initRootStore, rootStore } from '@/models'

import './globals.scss'
import Header from './Header'
import Main from './Main'
import PlayPanel from './PlayPanel'
import Statusbar from './Statusbar'

const pagesWithoutLayout = ['/lyric']

function MyApp(appProps: AppProps) {
  const { Component, pageProps } = appProps
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
          <Main {...appProps} />
          <PlayPanel />
          <Statusbar />
        </>
      )}
    </RootStoreContext.Provider>
  )
}

export default MyApp
