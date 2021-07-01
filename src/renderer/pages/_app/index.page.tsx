import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import type { AppProps /*, AppContext */ } from 'next/app'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { RootStoreContext, initRootStore, rootStore } from '@/models'

import './globals.scss'
import Header from './Header'
import Main from './Main'
import PlayPanel from './PlayPanel'
import Statusbar from './Statusbar'

dayjs.extend(duration)

const pagesWithoutLayout = ['/lyric']

function MyApp(appProps: AppProps) {
  const { Component, pageProps } = appProps
  const { pathname } = useRouter()
  const [readyToRender, setReadyToRender] = useState(false)
  const withoutLayout = pagesWithoutLayout.includes(pathname)

  useEffect(() => {
    initRootStore()
    setReadyToRender(true)
  }, [])

  if (!readyToRender) return null

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