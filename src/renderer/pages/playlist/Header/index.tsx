import dayjs from 'dayjs'
import React from 'react'
import { VscFile } from 'react-icons/vsc'

import { Link } from '@/components'
import { PlaylistDetailSnapshotOut } from '@/models'
import { path } from '@/path'

import styles from './Header.module.scss'

export type HeaderProps = { playlist: PlaylistDetailSnapshotOut }
export const Header: React.FC<HeaderProps> = ({ playlist }) => {
  const { creator, createTime, trackCount, name, coverImgUrl } = playlist

  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <img
          src={coverImgUrl}
          alt="Cover of the playlist"
          width={200}
          height={200}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.data}>
          <div className={styles.creator}>
            <Link href={path.user(creator.userId)}>
              <img src={creator.avatarUrl} />
            </Link>
            <Link href={path.user(creator.userId)}>
              <span>{creator.nickname}</span>
            </Link>
          </div>
          <div className={styles.created_at}>
            <span>创建于</span>
            <span>{dayjs(createTime).format('YYYY/MM/DD')}</span>
          </div>
          <div className={styles.n_song}>
            <VscFile />
            <span>{trackCount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
