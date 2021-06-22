import { ipcRenderer } from 'electron'
import { observer } from 'mobx-react-lite'
import { onAction, getSnapshot } from 'mobx-state-tree'
import { useEffect } from 'react'

import { usePlayer } from '@/models'

import CentralController from './CentralController'
import styles from './PlayPanel.module.scss'
import SideController from './SideController'
import SongCard from './SongCard'

export const PlayPanel: React.FC = observer(() => {
  const player = usePlayer()
  useEffect(() => {
    ipcRenderer.send('lyric:create', getSnapshot(player))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (player.lyric.show) {
      ipcRenderer.send('window:lyric:show')
    } else {
      ipcRenderer.send('window:lyric:hide')
    }
  }, [player.lyric.show])

  useEffect(() => {
    return onAction(player, (action) => {
      /**
       * Variables store time (like `currentTime`) should be calculated by other
       * variables, instead of sync them.
       */
      const excludedActions = ['_setCurrentTime', 'setTimeoutID']
      if (!excludedActions.includes(action.name)) {
        ipcRenderer.send('window:main:action', action)
      }
    })
  }, [player])

  return (
    <div className={styles['play-panel']}>
      <SongCard />
      <CentralController />
      <SideController />
    </div>
  )
})

export default PlayPanel
