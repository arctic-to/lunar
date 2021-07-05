import { observer } from 'mobx-react-lite'
import React, { useCallback, useMemo, useRef } from 'react'

import { VirtualList } from '@/components'
import { useSongDetail } from '@/data'
import { ScrollableAncestorContext, useSonglist } from '@/hooks'
import { usePlayer } from '@/models'

import { Song } from '../../components'

import styles from './PlayQueue.module.scss'

let inited = false

export const PlayQueue: React.VFC = observer(() => {
  const ref = useRef<HTMLDivElement>(null)
  const { queue } = usePlayer()
  const { songIds } = queue
  const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()

  // ensure song and privilege data is available
  // in memory for no cache case
  const _songIds = useMemo(() => {
    if (!inited) {
      inited = true
      return songIds
    }
  }, [songIds])
  useSongDetail(_songIds)

  const renderRow = useCallback(
    (index: number) => {
      const song = queue.modGet(index)

      // Maybe `songMap` have not been initialized with cache,
      // and `PlayQueue` will be rerendered when the request ends.
      if (!song) return null

      return (
        <Song
          key={song.id}
          song={song}
          active={activeSongIndexes.includes(index)}
          onClick={resetActiveSongIndexes(index)}
        />
      )
    },
    [queue, activeSongIndexes, resetActiveSongIndexes],
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>正在播放 ({queue.size})</div>
      <ScrollableAncestorContext.Provider value={ref.current}>
        <div className={styles.songlist} ref={ref}>
          <VirtualList rowCount={queue.size} rowHeight={30}>
            {renderRow}
          </VirtualList>
        </div>
      </ScrollableAncestorContext.Provider>
    </div>
  )
})

export default PlayQueue
