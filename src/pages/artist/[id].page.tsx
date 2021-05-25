import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import { useArtists } from '@/data'
import { useSonglist } from '@/hooks'

import { HotSong } from './HotSong'
import styles from './artist.module.scss'

export const Artist: React.FC = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { data } = useArtists(id)
  const { activeSongIndexes, resetActiveSongIndexes } = useSonglist()

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

      {data.hotSongs.map((hotSong, index) => (
        <HotSong
          key={index}
          index={index}
          hotSong={hotSong}
          active={activeSongIndexes.includes(index)}
          onClick={resetActiveSongIndexes(index)}
        />
      ))}
    </div>
  )
}

export default Artist
