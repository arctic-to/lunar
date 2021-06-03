import { observer } from 'mobx-react-lite'
import {
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react'

import { useUserPlaylist } from '@/data'
import { useTracker } from '@/hooks'
import { useSidebar, ViewPlaylistInstance } from '@/models'

import { Pane } from '../../../types'

import styles from './Platform.module.scss'
import { Playlist } from './Playlist'
import { Range, intersects, intersect, translate } from './range'

function getPlaylistRangeSize({ viewState, trackCount }: ViewPlaylistInstance) {
  return 1 + (viewState.folded ? 0 : trackCount)
}

const ITEM_SIZE = 30

export const NeteaseCloudMusicPane: Pane = observer(() => {
  const [tracker, track] = useTracker()

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [range, setRange] = useState<Range>()

  const { data } = useUserPlaylist()
  const sidebar = useSidebar()
  const playlists = data?.playlist

  const viewPlaylists = useMemo(() => sidebar.playlists.viewPlaylists, [
    sidebar.playlists.viewPlaylists,
  ])

  const playlistRanges = useMemo(() => {
    return viewPlaylists.reduce<Range[]>((acc, viewPlaylist) => {
      const [lastRange] = acc.slice(-1)
      const rangeSize = getPlaylistRangeSize(viewPlaylist)
      const start = lastRange ? lastRange.end : 0
      return acc.concat({ start, end: start + rangeSize })
    }, [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewPlaylists, tracker])

  const playlistIntersections = useMemo(() => {
    return playlistRanges.map((playlistRange) => {
      return range ? intersect(range, playlistRange) : { start: 0, end: 0 }
    })
  }, [playlistRanges, range])

  const height = useMemo(() => {
    return (
      ITEM_SIZE *
      viewPlaylists.reduce((acc, viewPlaylist) => {
        return acc + getPlaylistRangeSize(viewPlaylist)
      }, 0)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewPlaylists, tracker])

  useEffect(() => {
    if (playlists) sidebar.playlists.setPlaylists(playlists)
  }, [playlists, sidebar.playlists])

  const updateVisualState = useCallback((scrollTop: number) => {
    if (!containerRef.current) return
    const { height } = containerRef.current.getBoundingClientRect()
    const start = Math.floor(scrollTop / ITEM_SIZE)
    const end = Math.ceil((scrollTop + height) / ITEM_SIZE)

    setRange({
      start,
      end,
    })

    if (contentRef.current)
      contentRef.current.style.top = start * ITEM_SIZE + 'px'
  }, [])

  const handleScroll = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      updateVisualState(e.currentTarget.scrollTop)
    },
    [updateVisualState],
  )

  useEffect(() => {
    updateVisualState(0)
  }, [updateVisualState])

  const visiblePlaylistRange = useMemo(() => {
    let start = NaN
    let end = NaN

    if (!range) {
      return { start: 0, end: 0 }
    }

    for (let i = 0; i < playlistRanges.length; i++) {
      if (isNaN(start) && intersects(range, playlistRanges[i])) {
        start = i
      }
      if (!isNaN(start) && !intersects(range, playlistRanges[i])) {
        end = i
        break
      }
    }

    if (isNaN(end)) {
      end = playlistRanges.length + 1
    }

    return { start, end }
  }, [playlistRanges, range])

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onScroll={handleScroll}
    >
      <div className={styles.backbone} style={{ height }}></div>
      <div className={styles.content} ref={contentRef}>
        {viewPlaylists
          .slice(visiblePlaylistRange.start, visiblePlaylistRange.end)
          .map((viewPlaylist, _index) => {
            const index = _index + visiblePlaylistRange.start
            return (
              <Playlist
                key={viewPlaylist.id}
                viewPlaylist={viewPlaylist}
                track={track}
                visibleItemRange={translate(
                  playlistIntersections[index],
                  -playlistRanges[index].start,
                )}
              />
            )
          })}
      </div>
    </div>
  )
})

NeteaseCloudMusicPane.title = '网易云音乐'

export default NeteaseCloudMusicPane
