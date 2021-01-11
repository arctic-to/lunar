import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import { useToggle } from 'react-use'

import { Song } from '@/components'
import { usePlaylistDetail } from '@/data'
import { PlaylistSnapshot } from '@/models'

import styles from './Playlist.module.scss'

interface PlaylistProps {
  playlist: PlaylistSnapshot
}

export const Playlist: React.VFC<PlaylistProps> = ({ playlist }) => {
  const [folded, toggle] = useToggle(true)
  const { data } = usePlaylistDetail(folded ? null : playlist.id)

  return (
    <>
      <div key={playlist.id} className={styles.container} onClick={toggle}>
        {folded ? <VscChevronRight /> : <VscChevronDown />}
        {playlist.name}
      </div>
      <div>
        {data?.playlist.tracks.map((track) => (
          <Song key={track.id} song={track} />
        ))}
      </div>
    </>
  )
}

export default Playlist
