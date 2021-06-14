import c from 'classnames'
import React, { useCallback, useMemo, useState } from 'react'

import { addTag, useTags } from '@/data'
import { usePlatform } from '@/models'
import { getMst, GlobalTagStore, TagInstance } from '@/stores'

import { TagBase } from '../Tag'

import styles from './TagInput.module.scss'

const globalTagStore = getMst(GlobalTagStore)

export type ClickHandlerParams = { tagName?: string; tagId?: number }
export type TagInputProps = {
  keyword: string
  songId: number
  initialTags: TagInstance[]
}
export const TagInput: React.FC<TagInputProps> = ({
  keyword,
  songId,
  initialTags,
}) => {
  const [hasIdenticalTag, setHasIdenticalTag] = useState(false)
  const creatable = keyword && !hasIdenticalTag

  const { userId } = usePlatform().netease.profile ?? {}
  const { data, loading } = useTags(userId)

  const handleClick = useCallback(
    (args: ClickHandlerParams) => () => {
      if (userId) {
        addTag({ userId, songId, ...args }).then(({ tags }) => {
          globalTagStore.replaceSongTag(songId, tags)
        })
      }
    },
    [songId, userId],
  )

  const tags = useMemo(() => {
    const addableTags = data?.filter(
      (tag) => !initialTags.map(({ id }) => id).includes(tag.id),
    )
    return addableTags?.filter(({ name }) => {
      const _name = name.toLowerCase()
      const _keyword = keyword.toLowerCase()
      const matched = _name.includes(_keyword)
      if (matched && _name === _keyword) setHasIdenticalTag(true)
      return matched
    })
    // `initialTags` is a Proxy
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, initialTags.length, keyword])

  if (loading) return null

  return (
    <div className={styles.container}>
      {tags?.map((tag) => (
        <div
          key={tag.id}
          className={c(styles.row)}
          onClick={handleClick({ tagId: tag.id })}
        >
          <TagBase tagName={tag.name} />
        </div>
      ))}

      {creatable && (
        <div
          className={c(styles.row, styles.create)}
          onClick={handleClick({ tagName: keyword })}
        >
          Create <TagBase tagName={keyword} />
        </div>
      )}
    </div>
  )
}

export default TagInput
