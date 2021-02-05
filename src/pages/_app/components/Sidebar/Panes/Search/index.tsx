import { observer } from 'mobx-react-lite'
import { ChangeEvent, useCallback, useState } from 'react'

import { useCloudSearch } from '@/data'

import { SidebarComponent } from '../../types'

import styles from './Search.module.scss'
import { Song } from './Song'

export const Search: SidebarComponent = observer(() => {
  const [keywords, setKeywords] = useState('')
  const { data } = useCloudSearch({ keywords })

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search"
          onChange={handleChange}
        />
      </div>
      <div className={styles.songs}>
        {data?.result.songs?.map((song) => (
          <Song key={song.id} song={song} />
        ))}
      </div>
    </div>
  )
})

Search.title = 'Search'

export default Search
