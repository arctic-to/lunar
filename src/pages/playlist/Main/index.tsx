import { toLower } from 'lodash'
import React, { useCallback, useMemo, useState } from 'react'

import { SearchInput, Songlist } from '@/components'
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

  return (
    <div>
      <header>
        <div className={pageStyles.subtitle}>歌曲列表</div>
        <div>
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
