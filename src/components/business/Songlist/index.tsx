import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'

import { VirtualList } from '@/components'
import { useSonglist } from '@/hooks'
import { PrivilegeSnapshotIn, SongSnapshotIn } from '@/models'

import { Header } from './Header'
import SongBase from './SongBase'
import SongContainer from './SongContainer'
import styles from './Songlist.module.scss'
import TagInput from './TagInput'

type SonglistProps<T> = {
  songs: T[]
  privileges: PrivilegeSnapshotIn[]
  getExtraContent?: (song: T) => React.ReactNode
  hideHeader?: boolean
  displayTags?: boolean
}

export function Songlist<T extends SongSnapshotIn>({
  songs,
  privileges,
  getExtraContent,
  hideHeader = false,
  displayTags = false,
}: SonglistProps<T>) {
  const [privilegeMap, setPrivilegeMap] = useState<
    Map<number, PrivilegeSnapshotIn>
  >(new Map())
  const { activeSongIndexes, resetActiveSongIndexes, handleKeyDown } =
    useSonglist(songs, privilegeMap)

  useEffect(() => {
    setPrivilegeMap((prevPrivilegeMap) => {
      if (prevPrivilegeMap) return prevPrivilegeMap
      return new Map(songs.map((song, index) => [song.id, privileges[index]]))
    })
  }, [songs, privileges])

  const renderRow = useCallback(
    (index: number) => {
      const song = songs[index]
      return (
        <SongContainer
          key={song.id}
          index={index}
          songs={songs}
          privilege={privilegeMap.get(song.id)}
          active={activeSongIndexes.includes(index)}
          onClick={resetActiveSongIndexes(index)}
        >
          <SongBase
            index={index}
            song={song}
            privilege={privilegeMap.get(song.id)}
          />

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
      privilegeMap,
      resetActiveSongIndexes,
      songs,
    ],
  )

  return (
    <div className={styles.container} tabIndex={0} onKeyDown={handleKeyDown}>
      {!hideHeader && <Header key="Header" />}
      <VirtualList rowCount={songs.length} rowHeight={displayTags ? 64 : 36}>
        {renderRow}
      </VirtualList>
    </div>
  )
}

export default Songlist
