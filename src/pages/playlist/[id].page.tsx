import { useRouter } from 'next/router'
import React from 'react'

import { usePlaylistDetail } from '@/data'

import Header from './Header'
import Main from './Main'
import styles from './playlist.module.scss'

export const Playlist: React.FC = () => {
  const router = useRouter()
  const { id } = router.query as { id?: string }

  const { data } = usePlaylistDetail(id)

  if (!data) return null

  return (
    <div className={styles.container}>
      <Header data={data} />
      <Main data={data} />
    </div>
  )
}

export default Playlist
