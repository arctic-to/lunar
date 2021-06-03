import { observer } from 'mobx-react-lite'

import { useIsCurrShortcut } from '@/hooks'
import { ShortcutEnum } from '@/models'

import PaneContainer from '../../PaneContainer'

import { NeteaseCloudMusicPane } from './Platform'
import styles from './Playlists.module.scss'

const panes = [NeteaseCloudMusicPane]

export const Playlists: React.VFC = observer(() => {
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
})

export default Playlists
