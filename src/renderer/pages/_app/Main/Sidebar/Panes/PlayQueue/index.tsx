import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import React, { useCallback, useMemo } from 'react'

import { VirtualList } from '@/components'
import { useSongDetail } from '@/data'
import { useSonglist } from '@/hooks'
import { usePlayer } from '@/models'

import { Song } from '../../components'

import styles from './PlayQueue.module.scss'

let inited = false

export const PlayQueue: React.VFC = observer(() => {
  const { songs } = usePlayer().queue
  const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()

  // Load privileges when app starts
  const songIds = useMemo(() => {
    if (!inited) {
      inited = true
      return songs.map((song) => song.id)
    }
  }, [songs])
  useSongDetail(songIds)

  const renderRow = useCallback(
    (index: number) => {
      const song = songs[index]

      return (
        <Song
          key={song.id}
          song={getSnapshot(song)}
          active={activeSongIndexes.includes(index)}
          onClick={resetActiveSongIndexes(index)}
        />
      )
    },
    [activeSongIndexes, songs, resetActiveSongIndexes],
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>正在播放 ({songs.length})</div>
      <div className={styles.songlist}>
        <VirtualList rowCount={songs.length} rowHeight={30}>
          {renderRow}
        </VirtualList>
      </div>
    </div>
  )
})

export default PlayQueue
