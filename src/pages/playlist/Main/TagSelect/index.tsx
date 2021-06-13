import c from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { useCallback } from 'react'

import { TagBase } from '@/components'
import { useMst } from '@/stores'

import { useId } from '../../hooks'
import { PlaylistStore } from '../../playlist.store'

import styles from './TagSelect.module.scss'

export const TagSelect: React.FC = observer(() => {
  const id = useId()
  const { uniqTags, selectedTagIds, toggleTag } = useMst(PlaylistStore, {
    scope: id,
  })

  const handleClick = useCallback(
    (tagId: number) => () => {
      toggleTag(tagId)
    },
    [toggleTag],
  )

  return (
    <div className={styles.container}>
      {uniqTags.map((tag) => (
        <div
          key={tag.id}
          className={c(styles.row, {
            [styles.selected]: selectedTagIds.includes(tag.id),
          })}
          onClick={handleClick(tag.id)}
        >
          <TagBase tagName={tag.name} />
        </div>
      ))}
    </div>
  )
})

export default TagSelect
