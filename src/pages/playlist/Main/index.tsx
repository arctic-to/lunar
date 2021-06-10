import c from 'classnames'
import { uniqBy } from 'lodash'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { FaTags } from 'react-icons/fa'
import { useClickAway } from 'react-use'

import { Button, SearchInput, Songlist, TagSelect } from '@/components'
import {
  generateTags,
  PlaylistDetailResponseSnapshotOut,
  useSongTags,
} from '@/data'
import { useBoolean, useKeyword } from '@/hooks'
import { usePlatform } from '@/models'
import pageStyles from '@/style/business/page.module.scss'

import styles from './Main.module.scss'
import { filterTracksByKeyword, filterTracksByTags } from './utils'

enum State {
  Tagify,
  Filter,
}

const textMap = {
  [State.Tagify]: 'Tagify',
  [State.Filter]: 'Filter',
}

export type MainProps = { data: PlaylistDetailResponseSnapshotOut }
export const Main: React.FC<MainProps> = ({ data }) => {
  const { playlist, privileges } = data
  const [keyword, handleInputChange] = useKeyword()
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])
  const { userId } = usePlatform().netease.profile ?? {}

  const [isDropdownHidden, hideDropdown, , toggleDropdown] = useBoolean(true)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  useClickAway(dropdownRef, (e) => {
    if (!buttonRef.current?.contains(e.target as HTMLElement)) {
      hideDropdown()
    }
  })

  const trackIds = useMemo(() => playlist.trackIds.map(({ id }) => id), [
    playlist.trackIds,
  ])
  const { data: tags, loading } = useSongTags(userId, trackIds)
  const flatTags = useMemo(() => tags?.flat(), [tags])
  const uniqTags = useMemo(() => uniqBy(flatTags, 'id'), [flatTags])
  const state = flatTags?.length ? State.Filter : State.Tagify

  const tracks = useMemo(() => {
    const _tracks = filterTracksByKeyword(playlist.tracks, keyword)
    return tags ? filterTracksByTags(_tracks, tags, selectedTagIds) : _tracks
  }, [playlist.tracks, keyword, tags, selectedTagIds])

  const tagify = useCallback(() => {
    if (userId) generateTags({ userId, playlistId: playlist.id })
  }, [playlist.id, userId])

  const clickHandlerMap = useMemo(
    () => ({
      [State.Tagify]: tagify,
      [State.Filter]: toggleDropdown,
    }),
    [toggleDropdown, tagify],
  )

  if (loading) return null

  return (
    <div className={styles.container}>
      <header className={pageStyles.subtitle}>
        <div>歌曲列表</div>
        <div className={styles.right}>
          <SearchInput
            className={styles.search_input}
            value={keyword}
            onChange={handleInputChange}
          />
          <Button
            className={styles.button}
            ref={buttonRef}
            Icon={FaTags}
            onClick={clickHandlerMap[state]}
          >
            {textMap[state]}
          </Button>
          <div
            className={c(styles.dropdown, {
              [styles.hidden]: isDropdownHidden,
            })}
            ref={dropdownRef}
          >
            <TagSelect tags={uniqTags} onChange={setSelectedTagIds} />
          </div>
        </div>
      </header>

      <Songlist songs={tracks} privileges={privileges} tags={tags} />
    </div>
  )
}

export default Main
