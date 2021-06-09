import { NeteaseCloudMusicTag } from '@prisma/client'

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
            privilege={privileges[index]}
            tags={tags?.[index]}
          />
          {getExtraContent?.(song)}
        </SongContainer>
      ))}
    </div>
  )
}

export default Songlist
