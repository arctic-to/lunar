import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import { Songlist } from '@/components'
import { useArtists } from '@/data'

import styles from './artist.module.scss'

export const Artist: React.FC = () => {
  const router = useRouter()
  const { id } = router.query as { id?: string }
  const { data } = useArtists(id)

  if (!data) return null

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.img_container}>
          <Image
            src={data.artist.picUrl}
            alt="Picture of the artist"
            width={200}
            height={200}
            layout="fixed"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            <span className={styles.name}>{data.artist.name}</span>
            {data.artist.alias.length > 0 && (
              <span className={styles.alias}>
                ({data.artist.alias.join(', ')})
              </span>
            )}
          </div>
          <div className={styles.intro} title={data.artist.briefDesc}>
            {data.artist.briefDesc}
          </div>
        </div>
      </div>

      <Songlist
        songs={data.hotSongs}
        privileges={data.hotSongs.map((hotSong) => hotSong.privilege)}
      />
    </div>
  )
}

export default Artist
