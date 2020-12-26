import Head from 'next/head'

import Home from './_home'

export default function Index() {
  return (
    <div>
      <Head>
        <title>Lunar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />
    </div>
  )
}
