import { NeteaseCloudMusicTag } from '@prisma/client'
import { useEffect, useState } from 'react'

import { useSonglist } from '@/hooks'
import { PrivilegeSnapshotIn, SongSnapshotIn } from '@/models'

import SongBase from './SongBase'
import SongContainer from './SongContainer'

type SonglistProps<T> = {
  songs: T[]
  privileges: PrivilegeSnapshotIn[]
  tags?: NeteaseCloudMusicTag[][] | undefined
  getExtraContent?: (song: T) => React.ReactNode
  onDoubleClick?: () => void
}

export function Songlist<T extends SongSnapshotIn>({
  songs,
  privileges,
  tags,
  getExtraContent,
  onDoubleClick,
}: SonglistProps<T>) {
  const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()
  const [privilegeMap, setPrivilegeMap] = useState<
    Map<number, PrivilegeSnapshotIn>
  >(new Map())
  const [tagMap, setTagMap] = useState<Map<
    number,
    NeteaseCloudMusicTag[]
  > | null>(null)

  useEffect(() => {
    setPrivilegeMap((prevPrivilegeMap) => {
      if (prevPrivilegeMap) return prevPrivilegeMap
      return new Map(songs.map((song, index) => [song.id, privileges[index]]))
    })
  }, [songs, privileges])

  useEffect(() => {
    setTagMap((prevTagMap) => {
      if (!tags) return null
      if (prevTagMap) return prevTagMap
      return new Map(songs.map((song, index) => [song.id, tags[index]]))
    })
  }, [songs, tags])

  return (
    <div>
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
            tags={tagMap?.get(song.id)}
          />
          {getExtraContent?.(song)}
        </SongContainer>
      ))}
    </div>
  )
}

export default Songlist
