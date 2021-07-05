import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { useEffect } from 'react'

import { useNonNullableContext } from '@/hooks'
import { getMst } from '@/stores'

import SearchInput from '../../SearchInput'
import { SonglistContext } from '../context'

import styles from './Header.module.scss'
import { NormalHeaderStore } from './store'
import { filterTracksByKeyword } from './utils'

export const NormalHeader: React.FC = observer(() => {
  const { initialSongs, setSongs } = useNonNullableContext(SonglistContext)
  const { pathname } = useRouter()
  const { keyword, handleInputChange } = getMst(NormalHeaderStore, {
    scope: pathname,
  })
  const filteredTracks = useMemo(() => {
    return filterTracksByKeyword(initialSongs, keyword)
  }, [keyword, initialSongs])

  useEffect(() => {
    setSongs(filteredTracks)
  }, [filteredTracks, setSongs])

  return (
    <header className={styles.container}>
      <div className={styles.left}>歌曲列表 ({filteredTracks.length})</div>
      <div className={styles.right}>
        <SearchInput
          className={styles.search_input}
          value={keyword}
          onChange={handleInputChange}
        />
      </div>
    </header>
  )
})

export default NormalHeader
