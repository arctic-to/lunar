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
import { Range, intersect, translate, isEmpty } from './range'

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
  const { viewPlaylists, setPlaylists } = useSidebar().playlists
  const playlists = data?.playlist

  const playlistRanges = useMemo(() => {
    return viewPlaylists.reduce<Range[]>((acc, viewPlaylist) => {
      const [lastRange] = acc.slice(-1)
      const rangeSize = getPlaylistRangeSize(viewPlaylist)
      const start = lastRange ? lastRange.end : 0
      return acc.concat({ start, end: start + rangeSize })
    }, [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewPlaylists, tracker])

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
    if (playlists) setPlaylists(playlists)
  }, [playlists, setPlaylists])

  const updateVisualState = useCallback((scrollTop: number) => {
    if (!containerRef.current) return
    const { height } = containerRef.current.getBoundingClientRect()
    const start = Math.floor(scrollTop / ITEM_SIZE)
    const end = Math.ceil((scrollTop + height) / ITEM_SIZE)

    setRange({
      start,
      end,
    })

    if (contentRef.current) {
      contentRef.current.style.transform = `translate3d(0, ${
        start * ITEM_SIZE
      }px, 0)`
    }
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

  const playlistIntersections = useMemo(() => {
    return playlistRanges.map((playlistRange) => {
      return range ? intersect(range, playlistRange) : { start: 0, end: 0 }
    })
  }, [playlistRanges, range])

  const visiblePlaylistRange = useMemo(() => {
    let start = NaN
    let end = NaN

    if (!range) {
      return { start: 0, end: 0 }
    }

    for (let i = 0; i < playlistRanges.length; i++) {
      if (isNaN(start) && !isEmpty(playlistIntersections[i])) {
        start = i
      }
      if (!isNaN(start) && isEmpty(playlistIntersections[i])) {
        end = i
        break
      }
    }

    if (isNaN(end)) {
      end = playlistRanges.length + 1
    }

    return { start, end }
  }, [playlistIntersections, playlistRanges.length, range])

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
