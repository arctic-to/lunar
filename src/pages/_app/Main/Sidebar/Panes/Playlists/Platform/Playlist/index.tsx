import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import { useCallback, useEffect, useMemo } from 'react'

import { FolderPrefix } from '@/components'
import { usePlaylistDetail } from '@/data'
import { useSonglist } from '@/hooks'
import { ViewPlaylistInstance, usePlayer } from '@/models'

import { Song } from '../../../../components'
import { Range } from '../range'

import styles from './Playlist.module.scss'

interface PlaylistProps {
  viewPlaylist: ViewPlaylistInstance
  track: () => void
  visibleItemRange: Range
}

export const Playlist: React.VFC<PlaylistProps> = observer(
  ({ viewPlaylist, track, visibleItemRange }) => {
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

    const handleClick = useCallback(() => {
      viewPlaylist?.viewState.toggle()
      track()
    }, [track, viewPlaylist?.viewState])

    const updatePlayQueue = useCallback(() => {
      player.replaceQueue({
        name: viewPlaylist.name,
        songs: data?.playlist.tracks?.filter(
          (_, index) => data.privileges?.[index].cp,
        ),
      })
    }, [data?.playlist.tracks, data?.privileges, player, viewPlaylist.name])

    const [isHeaderVisible, visibleSongRange] = useMemo(() => {
      return visibleItemRange.start === 0
        ? [
            true,
            {
              ...visibleItemRange,
              start: visibleItemRange.start + 1,
            },
          ]
        : [false, visibleItemRange]
    }, [visibleItemRange])

    return (
      <>
        {isHeaderVisible && (
          <div
            key={viewPlaylist.id}
            className={styles.header}
            onClick={handleClick}
          >
            <FolderPrefix folded={folded} loading={loading} />
            {viewPlaylist.name}
          </div>
        )}

        {folded ||
          viewPlaylist?.viewState.playlistDetail?.tracks
            ?.slice(visibleSongRange.start, visibleSongRange.end)
            .map((track, _index) => {
              const index = _index + visibleSongRange.start
              return (
                <Song
                  key={track.id}
                  song={getSnapshot(track)}
                  privilege={viewPlaylist?.viewState.privileges[index]}
                  active={activeSongIndexes.includes(index)}
                  onClick={resetActiveSongIndexes(index)}
                  onDoubleClick={updatePlayQueue}
                />
              )
            })}
      </>
    )
  },
)

export default Playlist
