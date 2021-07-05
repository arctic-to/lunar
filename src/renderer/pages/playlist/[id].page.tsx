import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'

import { playlistMap } from '@/cache'
import { usePlaylistDetail } from '@/data'

import Header from './Header'
import Main from './Main'
import { useId } from './hooks'
import styles from './playlist.module.scss'

export const Playlist: React.FC = () => {
  const id = useId()

  const { data } = usePlaylistDetail(id)
  const playlist = useMemo(() => {
    const _playlist = data?.playlist
    const cache = playlistMap.get(id)
    return _playlist || cache
  }, [data?.playlist, id])

  if (!playlist) return null

  return (
    <div className={styles.container}>
      <Header playlist={playlist} />
      <Main playlist={playlist} />
    </div>
  )
}

export default observer(Playlist)
