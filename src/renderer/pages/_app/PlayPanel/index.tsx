import { ipcRenderer } from 'electron'
import { observer } from 'mobx-react-lite'
import {
  getSnapshot,
  applyAction,
  ISerializedActionCall,
  onSnapshot,
} from 'mobx-state-tree'
import { useEffect } from 'react'

import { usePlayer } from '@/models'

import CentralController from './CentralController'
import styles from './PlayPanel.module.scss'
import SideController from './SideController'
import SongCard from './SongCard'

export const PlayPanel: React.FC = observer(() => {
  const player = usePlayer()
  useEffect(() => {
    ipcRenderer.send('window:lyric:create', getSnapshot(player))
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
    const updateBounds = (
      event: Electron.IpcRendererEvent,
      bounds: Electron.Rectangle,
    ) => {
      player.lyric.setBounds(bounds)
    }
    ipcRenderer.on('window:lyric:move', updateBounds)
    ipcRenderer.on('window:lyric:resize', updateBounds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return onSnapshot(player, (snapshot) => {
      ipcRenderer.send('window:main:snapshot', snapshot)
    })
  }, [player])

  useEffect(() => {
    ipcRenderer.on(
      'window:lyric:action',
      (event, action: ISerializedActionCall) => {
        applyAction(player, action)
      },
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles['play-panel']}>
      <SongCard />
      <CentralController />
      <SideController />
    </div>
  )
})

export default PlayPanel
