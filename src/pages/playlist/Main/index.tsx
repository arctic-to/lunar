import { uniqBy } from 'lodash'
import React, { useCallback, useMemo, useState } from 'react'
import { useEffect } from 'react'
import { FaTags } from 'react-icons/fa'
import { usePopper } from 'react-popper'
import { useToggle } from 'react-use'

import { Button, SearchInput, Songlist } from '@/components'
import {
  generateTags,
  PlaylistDetailResponseSnapshotOut,
  useSongTags,
} from '@/data'
import { usePlatform } from '@/models'
import pageStyles from '@/style/business/page.module.scss'

import styles from './Main.module.scss'
import TagSelect from './TagSelect'
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
  const [keyword, setKeyword] = useState('')
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])
  const { userId } = usePlatform().netease.profile ?? {}

  const [isPopperHidden, toggleIsPopperHidden] = useToggle(true)
  const [
    referenceElement,
    setReferenceElement,
  ] = useState<HTMLButtonElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  )
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
  )

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

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.currentTarget.value)
    },
    [],
  )

  const tagify = useCallback(() => {
    if (userId) generateTags({ userId, playlistId: playlist.id })
  }, [playlist.id, userId])

  const clickHandlerMap = useMemo(
    () => ({
      [State.Tagify]: tagify,
      [State.Filter]: toggleIsPopperHidden,
    }),
    [tagify, toggleIsPopperHidden],
  )

  useEffect(() => {
    if (popperElement) {
      popperElement.style.display = isPopperHidden ? 'none' : ''
    }
  }, [isPopperHidden, popperElement])

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
            disabled={loading}
            Icon={FaTags}
            onClick={clickHandlerMap[state]}
            ref={setReferenceElement}
          >
            {textMap[state]}
          </Button>
          <div
            className={styles.popper}
            ref={setPopperElement}
            style={popperStyles.popper}
            {...attributes.popper}
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
