import React from 'react'

import { Link } from '@/components'
import { path } from '@/path'

import styles from './Home.module.scss'

export default function Home() {
  return (
    <main className={styles.container}>
      <Link href={path.charts}>
        <span>榜单</span>
      </Link>
    </main>
  )
}
