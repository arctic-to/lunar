import { toLower } from 'lodash'
import React, { useCallback, useMemo, useState } from 'react'
import { FaTags } from 'react-icons/fa'

import { Button, SearchInput, Songlist } from '@/components'
import { PlaylistDetailResponseSnapshotOut } from '@/data'
import pageStyles from '@/style/business/page.module.scss'

import styles from './Main.module.scss'

export type MainProps = { data: PlaylistDetailResponseSnapshotOut }
export const Main: React.FC<MainProps> = ({ data }) => {
  const [keyword, setKeyword] = useState('')

  const tracks = useMemo(() => {
    return !keyword
      ? data.playlist.tracks
      : data.playlist.tracks.filter((track) => {
          const names = [
            track.name,
            ...track.ar.map((artist) => artist.name),
            track.al.name,
          ].map(toLower)

          return names.some((name) => name.includes(keyword.toLowerCase()))
        })
  }, [data.playlist.tracks, keyword])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const tagify = useCallback(() => {}, [])

  return (
    <div className={styles.container}>
      <header className={pageStyles.subtitle}>
        <div>歌曲列表</div>
        <div className={styles.right}>
          <Button className={styles.button} Icon={FaTags} onClick={tagify}>
            Tagify
          </Button>
          <SearchInput
            className={styles.search_input}
            value={keyword}
            onChange={handleChange}
          />
        </div>
      </header>
      <Songlist songs={tracks} privileges={data.privileges} />
    </div>
  )
}

export default Main
