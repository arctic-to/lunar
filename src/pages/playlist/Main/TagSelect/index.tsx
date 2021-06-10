import { NeteaseCloudMusicTag } from '@prisma/client'
import c from 'classnames'
import React, { useCallback, useState } from 'react'

import { Tag } from '@/components'

import styles from './TagSelect.module.scss'

export type TagSelectProps = {
  tags: NeteaseCloudMusicTag[]
  onChange: (ids: number[]) => void
}
export const TagSelect: React.FC<TagSelectProps> = ({ tags, onChange }) => {
  const [ids, setIds] = useState<Set<number>>(new Set())

  const handleClick = useCallback(
    (tagId: number) => () => {
      setIds((ids) => {
        ids.has(tagId) ? ids.delete(tagId) : ids.add(tagId)
        onChange(Array.from(ids))
        return ids
      })
    },
    [onChange],
  )
  return (
    <div className={styles.container}>
      {tags.map((tag) => (
        <div
          key={tag.id}
          className={c(styles.row, { [styles.selected]: ids.has(tag.id) })}
          onClick={handleClick(tag.id)}
        >
          <Tag tag={tag} />
        </div>
      ))}
    </div>
  )
}

export default TagSelect
