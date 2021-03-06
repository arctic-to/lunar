import c from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { FaTags } from 'react-icons/fa'
import { useClickAway } from 'react-use'

import { Button } from '@/components/common'
import { generateTags, useSongTags } from '@/data'
import { useBoolean, useNonNullableContext } from '@/hooks'
import { usePlatform } from '@/models'
import { getMst, GlobalTagStore } from '@/stores'

import SearchInput from '../../SearchInput'
import { SonglistContext } from '../context'

import styles from './Header.module.scss'
import TagSelect from './TagSelect'
import { PlaylistHeaderStore } from './store'
import {
  filterTracksByKeyword,
  filterTracksByTags,
  usePlaylistId,
} from './utils'

const globalTagStore = getMst(GlobalTagStore)

export const PlaylistHeader: React.FC = observer(() => {
  const { initialSongs, setSongs } = useNonNullableContext(SonglistContext)
  const id = usePlaylistId()

  const {
    keyword,
    handleInputChange,
    songIdsWithoutTags,
    tags,
    uniqTags,
    selectedTagIds,
  } = getMst(
    PlaylistHeaderStore,
    {
      scope: id,
    },
    { id },
  )

  const { userId } = usePlatform().netease.profile ?? {}

  const [isDropdownHidden, hideDropdown, , toggleDropdown] = useBoolean(true)
  const filterButtonRef = useRef<HTMLButtonElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  useClickAway(dropdownRef, (e) => {
    if (!filterButtonRef.current?.contains(e.target as HTMLElement)) {
      hideDropdown()
    }
  })

  const { data: songTagPairs, loading } = useSongTags(userId, id)

  useEffect(() => {
    if (songTagPairs) {
      globalTagStore.setSongTagMap(songTagPairs)
    }
  }, [songTagPairs])

  const filteredTracks = useMemo(() => {
    const _tracks = filterTracksByKeyword(initialSongs, keyword)
    return tags ? filterTracksByTags(_tracks, selectedTagIds) : _tracks
    // The component is rerendered due to `selectedTagIds` change,
    // but `selectedTagIds` is considered as unchanged in hooks.
    // It seems a bug of React or Mst.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, initialSongs, selectedTagIds.length, tags])

  useEffect(() => {
    setSongs(filteredTracks)
  }, [filteredTracks, setSongs])

  const tagify = useCallback(() => {
    if (userId) generateTags({ userId, songIds: songIdsWithoutTags })
  }, [songIdsWithoutTags, userId])

  return (
    <header className={styles.container}>
      <div className={styles.left}>歌曲列表 ({filteredTracks.length})</div>
      <div className={styles.right}>
        {!loading && (
          <Button className={styles.button} Icon={FaTags} onClick={tagify}>
            Tagify
          </Button>
        )}

        {Boolean(uniqTags.length) && (
          <>
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
          </>
        )}

        <SearchInput
          className={styles.search_input}
          value={keyword}
          onChange={handleInputChange}
        />
      </div>
    </header>
  )
})

export default PlaylistHeader
