import c from 'classnames'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'

import { Loader } from '@/components'
import { useCloudSearch, SearchTypeEnum } from '@/data'

import Results from './Results'
import styles from './Search.module.scss'
import { getCount } from './getCount'

const typeMap = {
  [SearchTypeEnum.Song]: '单曲',
  [SearchTypeEnum.Artist]: '歌手',
  // [SearchTypeEnum.Album]: '专辑',
  [SearchTypeEnum.Playlist]: '歌单',
  [SearchTypeEnum.User]: '用户',
  [SearchTypeEnum.Lyric]: '歌词',
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
          {loading ? <Loader /> : getCount(data)}
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
      </div>

      <Results type={type} data={data} />
    </div>
  )
}

export default Search
