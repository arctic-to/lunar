import c from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useMemo, useRef } from 'react'
import { useClickAway } from 'react-use'

import { Tag } from '@/components/business/Tag'
import { useBoolean, useKeyword } from '@/hooks'
import { SongSnapshotIn } from '@/models'
import { getMst, GlobalTagStore } from '@/stores'

import AddTag from './AddTag'
import styles from './TagInput.module.scss'

export type TagInputProps = {
  song: SongSnapshotIn
}

const { songTagMap } = getMst(GlobalTagStore)

export const TagInput: React.FC<TagInputProps> = observer(({ song }) => {
  const [keyword, handleInputChange, clear] = useKeyword()
  const [isTagsActive, setTagsToActive, setTagsToInactive] = useBoolean(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  useClickAway(containerRef, setTagsToInactive)

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      setTagsToActive()
      if (inputRef.current) inputRef.current.focus()
    },
    [setTagsToActive],
  )

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
    },
    [],
  )

  const tags = useMemo(
    () => songTagMap.get(String(song.id)) ?? [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [song.id, songTagMap.size],
  )
  const isInputPlaceholderVisible = !tags.length

  return (
    <div
      className={c(styles.container, {
        [styles.active]: isTagsActive,
      })}
      ref={containerRef}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {tags?.map((tag) => (
        <Tag key={tag.id} tag={tag} active={isTagsActive} songId={song.id} />
      ))}

      <input
        type="text"
        ref={inputRef}
        value={keyword}
        onChange={handleInputChange}
        placeholder={isInputPlaceholderVisible ? '添加标签' : ''}
        style={{ cursor: isTagsActive ? '' : 'default' }}
      />

      {isTagsActive && (
        <div className={styles.tag_input}>
          <AddTag
            keyword={keyword}
            songId={song.id}
            initialTags={tags}
            onAdd={clear}
          />
        </div>
      )}
    </div>
  )
})

export default TagInput
