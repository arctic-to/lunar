import { useRouter } from 'next/router'
import React from 'react'

import { path } from '@/path'

import styles from './Home.module.scss'

export default function Home() {
  const router = useRouter()
  router.push(path.charts)
  return <main className={styles.container}></main>
}
