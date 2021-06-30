import { observer } from 'mobx-react-lite'
import Head from 'next/head'

import { usePlayer } from '@/models'

import Home from './_home'

export const Index: React.FC = observer(() => {
  const { currTrack } = usePlayer()

  return (
    <div>
      <Head>
        <title>{currTrack?.songTitle || 'Lunar'}</title>
        {/* https://www.electronjs.org/docs/tutorial/security#csp-meta-tag */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="script-src 'self';"
        ></meta>
      </Head>

      <Home />
    </div>
  )
})

export default Index
