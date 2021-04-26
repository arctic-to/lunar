import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { useUserPlaylist } from '@/data'
import { useIsCurrShortcut } from '@/hooks'
import { ShortcutEnum, useSidebar } from '@/models'

import PaneContainer from '../../PaneContainer'
import { Pane } from '../../types'

import Playlist from './Playlist'
import styles from './Playlists.module.scss'

const NeteaseCloudMusicPane: Pane = observer(() => {
  const { data } = useUserPlaylist()
  const sidebar = useSidebar()
  const playlists = data?.playlist

  useEffect(() => {
    if (playlists) sidebar.playlists.setPlaylists(playlists)
  }, [playlists, sidebar.playlists])

  return (
    <div className={styles.container}>
      {sidebar.playlists.viewPlaylists.map((viewPlaylist) => (
        <Playlist key={viewPlaylist.id} viewPlaylist={viewPlaylist} />
      ))}
    </div>
  )
})

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
        <PaneContainer key={Pane.title} Pane={Pane} defaultFolded={false} />
      ))}
    </div>
  )
}

export default Playlists
