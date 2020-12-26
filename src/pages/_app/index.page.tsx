import type { AppProps /*, AppContext */ } from 'next/app'

import { Header } from './components'
import './globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
