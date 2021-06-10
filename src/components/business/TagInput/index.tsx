import c from 'classnames'
import React, { useCallback, useMemo, useState } from 'react'

import { useTags } from '@/data'
import { usePlatform } from '@/models'

import { Tag, TagBase } from '../Tag'

import styles from './TagInput.module.scss'

export type ClickHandlerParams = { tagName?: string; tagId?: number }
export type TagInputProps = {
  keyword: string
  onClick: (args: ClickHandlerParams) => void
}
export const TagInput: React.FC<TagInputProps> = ({ keyword, onClick }) => {
  const [hasIdenticalTag, setHasIdenticalTag] = useState(false)
  const creatable = keyword && !hasIdenticalTag

  const { userId } = usePlatform().netease.profile ?? {}
  const { data, loading } = useTags(userId)

  const handleClick = useCallback(
    (args: ClickHandlerParams) => () => onClick(args),
    [onClick],
  )

  const tags = useMemo(() => {
    return data?.filter(({ name }) => {
      const _name = name.toLowerCase()
      const _keyword = keyword.toLowerCase()
      const matched = _name.includes(_keyword)
      if (matched && _name === _keyword) setHasIdenticalTag(true)
      return matched
    })
  }, [data, keyword])

  if (loading) return null

  return (
    <div className={styles.container}>
      {tags?.map((tag) => (
        <div
          key={tag.id}
          className={c(styles.row)}
          onClick={handleClick({ tagId: tag.id })}
        >
          <Tag tag={tag} />
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
