import dayjs from 'dayjs'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { VscFile } from 'react-icons/vsc'

import { Link, Songlist } from '@/components'
import { usePlaylistDetail } from '@/data'
import { path } from '@/path'
import pageStyles from '@/style/business/page.module.scss'

import styles from './playlist.module.scss'

export const Playlist: React.FC = () => {
  const router = useRouter()
  const { id } = router.query as { id?: string }

  const { data } = usePlaylistDetail(id)

  if (!data) return null

  const { creator, createTime, trackCount, name, tracks } = data.playlist

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.img_container}>
          <Image
            src={data.playlist.coverImgUrl}
            alt="Cover of the playlist"
            width={200}
            height={200}
            layout="fixed"
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

      <div>
        <div className={pageStyles.subtitle}>歌曲列表</div>
        <Songlist songs={tracks} privileges={data.privileges} />
      </div>
    </div>
  )
}

export default Playlist
