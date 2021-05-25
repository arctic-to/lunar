import { useSonglist } from '@/hooks'
import { PrivilegeSnapshotIn, SongSnapshotIn } from '@/models'

import SongBase from './SongBase'
import SongContainer from './SongContainer'

type SonglistProps<T> = {
  songs: T[]
  privileges: PrivilegeSnapshotIn[]
  getExtraContent?: (song: T) => React.ReactNode
  onDoubleClick?: () => void
}

export function Songlist<T extends SongSnapshotIn>({
  songs,
  privileges,
  getExtraContent,
  onDoubleClick,
}: SonglistProps<T>) {
  const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()
  return (
    <div>
      {songs.map((song, index) => (
        <SongContainer
          song={song}
          privilege={privileges[index]}
          active={activeSongIndexes.includes(index)}
          onClick={resetActiveSongIndexes(index)}
          onDoubleClick={onDoubleClick}
        >
          <SongBase index={index} song={song} privilege={privileges[index]} />
          {getExtraContent?.(song)}
        </SongContainer>
      ))}
    </div>
  )
}

export default Songlist
