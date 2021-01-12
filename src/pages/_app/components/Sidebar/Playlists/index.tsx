import { useUserPlaylist } from '@/data'

import { SidebarComponent, Pane } from '../types'

import Playlist from './Playlist'
import styles from './Playlists.module.scss'

const NeteaseCloudMusicPane: Pane = () => {
  const { data } = useUserPlaylist()
  if (!data) return null

  const { playlist: playlists } = data
  return (
    <div className={styles.container}>
      {playlists.map((playlist) => (
        <Playlist key={playlist.id} playlist={playlist} />
      ))}
    </div>
  )
}

NeteaseCloudMusicPane.title = '网易云音乐'

export const Playlists: SidebarComponent = {
  name: 'Playlists',
  Panes: [NeteaseCloudMusicPane],
}

export default Playlists
