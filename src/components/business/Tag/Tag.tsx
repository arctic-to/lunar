import { useCallback } from 'react'
import { IoClose } from 'react-icons/io5'

import { removeTag } from '@/data'
import { TagInstance } from '@/stores'

import styles from './Tag.module.scss'

export type TagProps = {
  tag: TagInstance
  songId: number
  active?: boolean
}
export const Tag: React.FC<TagProps> = ({ tag, songId, active = false }) => {
  const handleClick = useCallback(() => {
    removeTag(tag.id, songId)
  }, [songId, tag.id])

  return (
    <div className={styles.container}>
      <span>{tag.name}</span>
      {active && <IoClose onClick={handleClick} />}
    </div>
  )
}

export default Tag
