import React from 'react'

import { SearchInput } from '@/components'

import styles from './Home.module.scss'

export default function Home() {
  return (
    <main className={styles.container}>
      <SearchInput className={styles.search_input} />
    </main>
  )
}
