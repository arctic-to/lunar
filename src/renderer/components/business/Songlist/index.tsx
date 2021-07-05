import React, { useState } from 'react'
import { useCallback } from 'react'

import { VirtualList } from '@/components/common'
import { useSonglist } from '@/hooks'
import { SongSnapshotIn } from '@/models'

import Header from './Header'
import { ListHeader } from './ListHeader'
import SongBase from './SongBase'
import SongContainer from './SongContainer'
import styles from './Songlist.module.scss'
import TagInput from './TagInput'
import { SonglistContext } from './context'

type SonglistProps<T> = {
  songs: T[]
  getExtraContent?: (song: T) => React.ReactNode
  hideHeader?: boolean
  hideListHeader?: boolean
  displayTags?: boolean
  virtual?: boolean
}

export function Songlist<T extends SongSnapshotIn>({
  songs: initialSongs,
  getExtraContent,
  hideHeader = false,
  hideListHeader = false,
  displayTags = false,
  virtual = false,
}: SonglistProps<T>) {
  const [songs, setSongs] = useState(initialSongs)

  const { activeSongIndexes, resetActiveSongIndexes, handleKeyDown } =
    useSonglist(songs)

  const renderRow = useCallback(
    (index: number) => {
      const song = songs[index]
      return (
        <SongContainer
          key={song.id}
          index={index}
          songs={songs}
          active={activeSongIndexes.includes(index)}
          onClick={resetActiveSongIndexes(index)}
        >
          <SongBase index={index} song={song} />

          <div className={styles.bottom}>
            {displayTags && <TagInput song={song} />}
          </div>
          {getExtraContent?.(song)}
        </SongContainer>
      )
    },
    [
      activeSongIndexes,
      displayTags,
      getExtraContent,
      resetActiveSongIndexes,
      songs,
    ],
  )

  return (
    <SonglistContext.Provider value={{ initialSongs, setSongs }}>
      <div className={styles.container}>
        {!hideHeader && <Header />}
        {!hideListHeader && <ListHeader />}
        {virtual ? (
          <VirtualList
            rowCount={songs.length}
            rowHeight={displayTags ? 64 : 36}
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            {renderRow}
          </VirtualList>
        ) : (
          songs.map((_, index) => renderRow(index))
        )}
      </div>
    </SonglistContext.Provider>
  )
}

export default Songlist
