import React from 'react'

import { Playlist } from '@/components'
import { useUserPlaylist } from '@/data'
import styles from '@/style/business/page.module.scss'

import { useId } from '../useId'

export const Playlists: React.FC = () => {
  const id = useId()
  const { data } = useUserPlaylist(id)

  return (
    <div>
      <div className={styles.subtitle}>歌单</div>
      <div>
        {data?.playlist.map((playlist) => (
          <Playlist key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  )
}

export default Playlists
