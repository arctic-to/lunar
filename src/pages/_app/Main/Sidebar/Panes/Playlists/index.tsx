import { observer } from 'mobx-react-lite'

import PaneContainer from '../../PaneContainer'

import { NeteaseCloudMusicPane } from './Platform'
import styles from './Playlists.module.scss'

const panes = [NeteaseCloudMusicPane]

export const Playlists: React.VFC = observer(() => {
  return (
    <div className={styles.container}>
      {panes.map((Pane) => (
        <PaneContainer key={Pane.title} Pane={Pane} defaultFolded={false} />
      ))}
    </div>
  )
})

export default Playlists
