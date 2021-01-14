import { useCallback } from 'react'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import { useToggle } from 'react-use'

import { usePlaylistDetail } from '@/data'
import { PlaylistSnapshot, usePlayer } from '@/models'

import styles from './Playlist.module.scss'
import { Song } from './Song'

interface PlaylistProps {
  playlist: PlaylistSnapshot
}

export const Playlist: React.VFC<PlaylistProps> = ({ playlist }) => {
  const [folded, toggle] = useToggle(true)
  const player = usePlayer()
  const { data } = usePlaylistDetail(folded ? null : playlist.id)

  const updatePlayQueue = useCallback(() => {
    player.replaceQueue({
      name: playlist.name,
      songs: data?.playlist.tracks,
    })
  }, [data?.playlist.tracks, player, playlist.name])

  return (
    <div className={styles.container}>
      <div key={playlist.id} className={styles.header} onClick={toggle}>
        {folded ? <VscChevronRight /> : <VscChevronDown />}
        {playlist.name}
      </div>
      <div className={styles.songs}>
        {data?.playlist.tracks?.map((track) => (
          <Song key={track.id} song={track} onDoubleClick={updatePlayQueue} />
        ))}
      </div>
    </div>
  )
}

export default Playlist
