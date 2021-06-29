import c from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FaTags } from 'react-icons/fa'
import { useClickAway } from 'react-use'

import { Button, SearchInput, Songlist } from '@/components'
import {
  generateTags,
  PlaylistDetailResponseSnapshotOut,
  useSongDetail,
  useSongTags,
} from '@/data'
import { useBoolean } from '@/hooks'
import { usePlatform } from '@/models'
import { getMst } from '@/stores'
import pageStyles from '@/style/business/page.module.scss'

import { useId } from '../hooks'
import { PlaylistStore } from '../playlist.store'

import styles from './Main.module.scss'
import TagSelect from './TagSelect'
import { filterTracksByKeyword, filterTracksByTags } from './utils'

export type MainProps = {
  data: PlaylistDetailResponseSnapshotOut
}
export const Main: React.FC<MainProps> = observer(({ data }) => {
  const { tracks: initialTracks, trackIds } = data.playlist
  const id = useId()!
  const { keyword, handleInputChange, tags, setSongTagMap, selectedTagIds } =
    getMst(PlaylistStore, {
      scope: id,
    })

  const { userId } = usePlatform().netease.profile ?? {}

  const [isDropdownHidden, hideDropdown, , toggleDropdown] = useBoolean(true)
  const filterButtonRef = useRef<HTMLButtonElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  useClickAway(dropdownRef, (e) => {
    if (!filterButtonRef.current?.contains(e.target as HTMLElement)) {
      hideDropdown()
    }
  })

  const { data: songTagPairs } = useSongTags(userId, id)

  useEffect(() => {
    if (songTagPairs) setSongTagMap(songTagPairs)
  }, [setSongTagMap, songTagPairs])

  const restTrackIds = useMemo(
    () => trackIds.slice(initialTracks.length).map(({ id }) => id),
    [initialTracks.length, trackIds],
  )
  const [tracks, setTracks] = useState(initialTracks)
  const { data: restTracks } = useSongDetail(restTrackIds)
  useEffect(() => {
    setTracks([...initialTracks, ...restTracks])
  }, [initialTracks, restTracks])

  const filteredTracks = useMemo(() => {
    const _tracks = filterTracksByKeyword(tracks, keyword)
    return tags ? filterTracksByTags(_tracks, selectedTagIds) : _tracks
    // The component is rerendered due to `selectedTagIds` change,
    // but `selectedTagIds` is considered as unchanged in hooks.
    // It seems a bug of React or Mst.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, tracks, selectedTagIds.length, tags])

  const tagify = useCallback(() => {
    if (userId) generateTags({ userId, playlistId: id })
  }, [id, userId])

  return (
    <div className={styles.container}>
      <header className={pageStyles.subtitle}>
        <div>歌曲列表 ({filteredTracks.length})</div>
        <div className={styles.right}>
          <SearchInput
            className={styles.search_input}
            value={keyword}
            onChange={handleInputChange}
          />
          <Button className={styles.button} Icon={FaTags} onClick={tagify}>
            Tagify
          </Button>
          <Button
            className={c(styles.button, {
              [styles.active]: selectedTagIds.length || !isDropdownHidden,
            })}
            ref={filterButtonRef}
            onClick={toggleDropdown}
          >
            Filter
          </Button>
          <div
            className={c(styles.dropdown, {
              [styles.hidden]: isDropdownHidden,
            })}
            ref={dropdownRef}
          >
            <TagSelect />
          </div>
        </div>
      </header>

      <Songlist songs={filteredTracks} displayTags virtual />
    </div>
  )
})

export default Main
