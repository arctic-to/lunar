import { toLower } from 'lodash'
import React, { useCallback, useMemo, useState } from 'react'
import { FaTags } from 'react-icons/fa'

import { Button, SearchInput, Songlist } from '@/components'
import {
  generateTags,
  PlaylistDetailResponseSnapshotOut,
  useSongTags,
} from '@/data'
import { usePlatform } from '@/models'
import pageStyles from '@/style/business/page.module.scss'

import styles from './Main.module.scss'

export type MainProps = { data: PlaylistDetailResponseSnapshotOut }
export const Main: React.FC<MainProps> = ({ data }) => {
  const { playlist, privileges } = data

  const [keyword, setKeyword] = useState('')
  const { userId } = usePlatform().netease.profile ?? {}

  const { data: tags } = useSongTags(
    userId,
    playlist.tracks.map((track) => track.id),
  )

  const tagified = tags ? Boolean(tags.flat().length) : true

  const tracks = useMemo(() => {
    return !keyword
      ? playlist.tracks
      : playlist.tracks.filter((track) => {
          const names = [
            track.name,
            ...track.ar.map((artist) => artist.name),
            track.al.name,
          ].map(toLower)

          return names.some((name) => name.includes(keyword.toLowerCase()))
        })
  }, [playlist.tracks, keyword])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value)
  }, [])

  const tagify = useCallback(() => {
    if (userId) generateTags({ userId, playlistId: playlist.id })
  }, [playlist.id, userId])

  return (
    <div className={styles.container}>
      <header className={pageStyles.subtitle}>
        <div>歌曲列表</div>
        <div className={styles.right}>
          <SearchInput
            className={styles.search_input}
            value={keyword}
            onChange={handleChange}
          />
          <Button
            className={styles.button}
            disabled={tagified}
            Icon={FaTags}
            onClick={tagify}
          >
            {!tagified && 'Tagify'}
          </Button>
        </div>
      </header>

      <Songlist songs={tracks} privileges={privileges} tags={tags} />
    </div>
  )
}

export default Main
