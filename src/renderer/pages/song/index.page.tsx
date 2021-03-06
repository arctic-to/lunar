import { observer } from 'mobx-react-lite'
import React from 'react'

import { Album, Artists } from '@/components'
import { usePlayer } from '@/models'

import { Main } from './Main'
import styles from './song.module.scss'

export const Song: React.FC = observer(() => {
  const { song } = usePlayer().track

  if (!song) return null

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>{song.name}</div>
        <div className={styles.subtitle}>
          <Artists song={song} />
          -
          <Album album={song.al} />
        </div>
      </div>

      <Main />
    </div>
  )
})

export default Song
