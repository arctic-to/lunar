import c from 'classnames'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'

import { Loader, SearchInput } from '@/components'
import { useCloudSearch, SearchTypeEnum } from '@/data'

import styles from './Search.module.scss'
import Songlist from './Songlist'

const typeMap = {
  [SearchTypeEnum.Song]: '单曲',
  [SearchTypeEnum.Author]: '歌手',
  [SearchTypeEnum.Album]: '专辑',
  [SearchTypeEnum.Playlist]: '歌单',
  [SearchTypeEnum.Lyric]: '歌词',
  [SearchTypeEnum.User]: '用户',
}

export const Search: React.VFC = () => {
  const { keywords } = useRouter().query as { keywords: string }
  const [type, setType] = useState(SearchTypeEnum.Song)
  const { data, loading } = useCloudSearch({ keywords, type })
  const clickHandler = useCallback(
    (type: SearchTypeEnum) => () => setType(type),
    [],
  )

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.state}>
          {loading ? <Loader /> : data?.result.songCount}
        </span>
        <div className={styles.types}>
          {Object.entries(typeMap).map(([key, value]) => (
            <span
              key={key}
              className={c({
                [styles.current_type]: Number(key) === type,
              })}
              onClick={clickHandler(Number(key))}
            >
              {value}
            </span>
          ))}
        </div>
        <SearchInput className={styles.search_input} />
      </div>
      <Songlist songs={data?.result.songs} />
    </div>
  )
}

export default Search
