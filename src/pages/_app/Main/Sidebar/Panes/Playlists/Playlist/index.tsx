import { useCallback } from 'react'
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc'
import { useToggle } from 'react-use'

import { usePlaylistDetail } from '@/data'
import { useSonglist } from '@/hooks'
import { PlaylistSnapshot, usePlayer } from '@/models'

import { Song } from '../../../components'

import styles from './Playlist.module.scss'

interface PlaylistProps {
  playlist: PlaylistSnapshot
}

export const Playlist: React.VFC<PlaylistProps> = ({ playlist }) => {
  const [folded, toggle] = useToggle(true)
  const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()
  const player = usePlayer()
  const { data } = usePlaylistDetail(folded ? null : playlist.id)

  const updatePlayQueue = useCallback(() => {
    player.replaceQueue({
      name: playlist.name,
      songs: data?.playlist.tracks?.filter(
        (_, index) => data.privileges?.[index].cp,
      ),
    })
  }, [data?.playlist.tracks, data?.privileges, player, playlist.name])

  return (
    <div className={styles.container}>
      <div key={playlist.id} className={styles.header} onClick={toggle}>
        {folded ? <VscChevronRight /> : <VscChevronDown />}
        {playlist.name}
      </div>
      <div className={styles.songlist}>
        {data?.playlist.tracks?.map((track, index) => (
          <Song
            key={track.id}
            song={track}
            privilege={data.privileges?.[index]}
            active={activeSongIndexes.includes(index)}
            onClick={resetActiveSongIndexes(index)}
            onDoubleClick={updatePlayQueue}
          />
        ))}
      </div>
    </div>
  )
}

export default Playlist
