import { useCallback } from 'react'
import { IoClose } from 'react-icons/io5'

import { removeTag } from '@/data'
import { usePlatform } from '@/models'
import { getMst, GlobalTagStore, TagInstance } from '@/stores'

import styles from './Tag.module.scss'

const globalTagStore = getMst(GlobalTagStore)

export type TagProps = {
  tag: TagInstance
  songId: number
  active?: boolean
}
export const Tag: React.FC<TagProps> = ({ tag, songId, active = false }) => {
  const { userId } = usePlatform().netease.profile ?? {}

  const handleClick = useCallback(() => {
    if (userId) {
      removeTag(songId, userId, tag.id).then(({ tags }) => {
        globalTagStore.replaceSongTag(songId, tags)
      })
    }
  }, [songId, tag.id, userId])

  return (
    <div className={styles.container}>
      <span>{tag.name}</span>
      {active && <IoClose onClick={handleClick} />}
    </div>
  )
}

export default Tag
