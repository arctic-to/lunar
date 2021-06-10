import { NeteaseCloudMusicTag } from '@prisma/client'
import { IoClose } from 'react-icons/io5'

import styles from './Tag.module.scss'

export type TagProps = {
  tag: NeteaseCloudMusicTag
  active?: boolean
}
export const Tag: React.FC<TagProps> = ({ tag, active = false }) => {
  return (
    <div className={styles.container}>
      <span>{tag.name}</span>
      {active && <IoClose />}
    </div>
  )
}

export default Tag
