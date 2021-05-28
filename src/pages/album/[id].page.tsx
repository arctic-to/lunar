import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import { Link, Songlist } from '@/components'
import { useAlbum } from '@/data'
import { path } from '@/path'

import styles from './album.module.scss'

export const Album: React.FC = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { data } = useAlbum(id)

  if (!data) return null

  const { picUrl, name, artist, description } = data.album

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.img_container}>
          <Image
            src={picUrl}
            alt="Cover of the album"
            width={200}
            height={200}
            layout="fixed"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>{name}</div>
          <div className={styles.artist}>
            -{' '}
            <Link href={path.artist(artist.id)}>
              <span>{artist.name}</span>
            </Link>
          </div>
          <div className={styles.description} title={description}>
            {description}
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
