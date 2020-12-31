import Head from 'next/head'

import Home from './_home'

export default function Index() {
  return (
    <div>
      <Head>
        <title>Lunar</title>
        <link rel="icon" href="/favicon.ico" />
        {/* https://www.electronjs.org/docs/tutorial/security#csp-meta-tag */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="script-src 'self';"
        ></meta>
      </Head>

      <Home />
    </div>
  )
}
