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

const otherRendererPaths = ['/lyric']

function MyApp(appProps: AppProps) {
  const { pathname } = useRouter()
  const isOtherRenderer = otherRendererPaths.includes(pathname)
  const Renderer = isOtherRenderer ? OtherRenderer : MainRenderer

  return <Renderer {...appProps} />
}

function MainRenderer(appProps: AppProps) {
  const [readyToRender, setReadyToRender] = useState(false)

  useEffect(() => {
    initRootStore()
    setReadyToRender(true)
  }, [])

  if (!readyToRender) return null

  return (
    <RootStoreContext.Provider value={rootStore}>
      <Header />
      <Main {...appProps} />
      <PlayPanel />
      <Statusbar />
    </RootStoreContext.Provider>
  )
}

function OtherRenderer({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
