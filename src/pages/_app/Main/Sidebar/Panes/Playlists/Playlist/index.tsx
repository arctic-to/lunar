import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import { useCallback, useEffect } from 'react'

import { FolderPrefix } from '@/components'
import { usePlaylistDetail } from '@/data'
import { useSonglist } from '@/hooks'
import { ViewPlaylistInstance, usePlayer } from '@/models'

import { Song } from '../../../components'

import styles from './Playlist.module.scss'

interface PlaylistProps {
  viewPlaylist: ViewPlaylistInstance
}

export const Playlist: React.VFC<PlaylistProps> = observer(
  ({ viewPlaylist }) => {
    const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()
    const player = usePlayer()

    const folded = viewPlaylist?.viewState.folded ?? true

    const { data, loading } = usePlaylistDetail(folded ? null : viewPlaylist.id)

    useEffect(() => {
      if (data) {
        viewPlaylist?.viewState.setPlaylistDetail(data.playlist)
        viewPlaylist?.viewState.setPrivileges(data.privileges)
      }
    }, [data, viewPlaylist])

    const updatePlayQueue = useCallback(() => {
      player.replaceQueue({
        name: viewPlaylist.name,
        songs: data?.playlist.tracks?.filter(
          (_, index) => data.privileges?.[index].cp,
        ),
      })
    }, [data?.playlist.tracks, data?.privileges, player, viewPlaylist.name])

    return (
      <div className={styles.container}>
        <div
          key={viewPlaylist.id}
          className={styles.header}
          onClick={viewPlaylist?.viewState.toggle}
        >
          <FolderPrefix folded={folded} loading={loading} />
          {viewPlaylist.name}
        </div>
        <div className={styles.songlist}>
          {folded ||
            viewPlaylist?.viewState.playlistDetail?.tracks?.map(
              (track, index) => (
                <Song
                  key={track.id}
                  song={getSnapshot(track)}
                  privilege={viewPlaylist?.viewState.privileges[index]}
                  active={activeSongIndexes.includes(index)}
                  onClick={resetActiveSongIndexes(index)}
                  onDoubleClick={updatePlayQueue}
                />
              ),
            )}
        </div>
      </div>
    )
  },
)

export default Playlist
