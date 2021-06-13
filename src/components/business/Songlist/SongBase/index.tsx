import c from 'classnames'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useRef } from 'react'
import { useClickAway } from 'react-use'

import { Tag } from '@/components'
import Album from '@/components/business/Album'
import Artists from '@/components/business/Artists'
import Like from '@/components/business/Like'
import { ProgressBar } from '@/components/common'
import { useBoolean, useKeyword, usePlaying } from '@/hooks'
import { PrivilegeSnapshotIn, SongSnapshotIn } from '@/models'
import { TagInstance } from '@/stores'

import TagInput from '../../TagInput'

import styles from './SongBase.module.scss'

export type SongBaseProps = {
  index: number
  song: SongSnapshotIn
  privilege: PrivilegeSnapshotIn | undefined
  tags?: TagInstance[] | undefined
}
export const SongBase: React.FC<SongBaseProps> = observer(
  ({ index, song, privilege, tags }) => {
    const [keyword, handleInputChange] = useKeyword()
    const [isTagsActive, setTagsToActive, setTagsToInactive] = useBoolean(false)
    const tagsContainerRef = useRef<HTMLDivElement | null>(null)
    useClickAway(tagsContainerRef, setTagsToInactive)

    const playing = usePlaying(song)
    const unavailable = !(privilege?.cp ?? true)

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        setTagsToActive()
      },
      [setTagsToActive],
    )

    const handleDoubleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
      },
      [],
    )

    return (
      <div className={styles.container}>
        <div
          className={c(styles.top, {
            [styles.playing]: playing,
            [styles.unavailable]: unavailable,
          })}
        >
          <span className={styles.index}>{index + 1}</span>
          <Like songId={song.id} />
          <span className={styles.name}>{song.name}</span>
          <Artists className={styles.artist} song={song} />
          <Album className={styles.album} album={song.al} />
          <span className={styles.duration}>
            {dayjs.duration(song.dt).format('mm:ss')}
          </span>
          <span className={styles.pop}>
            <ProgressBar percentage={song.pop / 100} />
          </span>
        </div>

        <div className={styles.bottom}>
          {tags && (
            <div
              className={c(styles.tags_container, {
                [styles.active]: isTagsActive,
              })}
              ref={tagsContainerRef}
              onClick={handleClick}
              onDoubleClick={handleDoubleClick}
            >
              {tags.map((tag) => (
                <Tag
                  key={tag.id}
                  tag={tag}
                  active={isTagsActive}
                  songId={song.id}
                />
              ))}
              {isTagsActive && (
                <input
                  type="text"
                  value={keyword}
                  onChange={handleInputChange}
                  autoFocus
                />
              )}
              {isTagsActive && (
                <div className={styles.tag_input}>
                  <TagInput
                    keyword={keyword}
                    songId={song.id}
                    initialTags={tags}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  },
)

export default SongBase
