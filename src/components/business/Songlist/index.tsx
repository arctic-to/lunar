import React, { useEffect, useState } from 'react'

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
  onDoubleClick?: () => void
  hideHeader?: boolean
  displayTags?: boolean
}

export function Songlist<T extends SongSnapshotIn>({
  songs,
  privileges,
  getExtraContent,
  onDoubleClick,
  hideHeader = false,
  displayTags = false,
}: SonglistProps<T>) {
  const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()
  const [privilegeMap, setPrivilegeMap] = useState<
    Map<number, PrivilegeSnapshotIn>
  >(new Map())

  useEffect(() => {
    setPrivilegeMap((prevPrivilegeMap) => {
      if (prevPrivilegeMap) return prevPrivilegeMap
      return new Map(songs.map((song, index) => [song.id, privileges[index]]))
    })
  }, [songs, privileges])

  return (
    <div>
      {hideHeader || <Header />}

      {songs.map((song, index) => (
        <SongContainer
          key={song.id}
          song={song}
          privilege={privileges[index]}
          active={activeSongIndexes.includes(index)}
          onClick={resetActiveSongIndexes(index)}
          onDoubleClick={onDoubleClick}
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
      ))}
    </div>
  )
}

export default Songlist
