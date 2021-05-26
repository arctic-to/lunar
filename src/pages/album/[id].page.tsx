import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import { ArtistLink, Songlist } from '@/components'
import { useAlbum } from '@/data'

import styles from './album.module.scss'

export const Album: React.FC = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { data } = useAlbum(id)

  if (!data) return null

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.img_container}>
          <Image
            src={data.album.picUrl}
            alt="Cover of the album"
            width={200}
            height={200}
            layout="fixed"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{data.album.name}</div>
          <div className={styles.artist}>
            - <ArtistLink artist={data.album.artist} />
          </div>
          <div className={styles.description} title={data.album.description}>
            {data.album.description}
          </div>
        </div>
      </div>

      <Songlist
        songs={data.songs}
        privileges={data.songs.map((song) => song.privilege)}
      />
    </div>
  )
}

export default Album
