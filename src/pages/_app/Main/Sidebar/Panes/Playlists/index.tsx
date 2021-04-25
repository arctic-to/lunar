import { useUserPlaylist } from '@/data'
import { useIsCurrShortcut } from '@/hooks'
import { ShortcutEnum } from '@/models'

import PaneContainer from '../../PaneContainer'
import { Pane } from '../../types'

import Playlist from './Playlist'
import styles from './Playlists.module.scss'

const NeteaseCloudMusicPane: Pane = () => {
  const { data } = useUserPlaylist()
  if (!data) return null

  const { playlist: playlists } = data
  return (
    <div className={styles.container}>
      {playlists?.map((playlist) => (
        <Playlist key={playlist.id} playlist={playlist} />
      ))}
    </div>
  )
}

NeteaseCloudMusicPane.title = '网易云音乐'

const panes = [NeteaseCloudMusicPane]

export const Playlists: React.VFC = () => {
  const isCurrShortcut = useIsCurrShortcut(ShortcutEnum.Playlists)

  return (
    <div
      className={styles.container}
      style={isCurrShortcut ? undefined : { display: 'none' }}
    >
      {panes.map((Pane) => (
        <PaneContainer key={Pane.title} Pane={Pane} />
      ))}
    </div>
  )
}

export default Playlists
