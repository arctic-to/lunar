import { useRouter } from 'next/router'
import React from 'react'
import { useRef } from 'react'
import { useCallback } from 'react'
import { VscSearch } from 'react-icons/vsc'

import styles from './Home.module.scss'

export default function Home() {
  const router = useRouter()
  const ref = useRef<HTMLInputElement>(null)
  const handleEnterDown = useCallback<React.KeyboardEventHandler>(
    (e) => {
      const keywords = ref.current?.value
      if (e.code === 'Enter') {
        router.push(`search?keywords=${keywords}`)
      }
    },
    [router],
  )

  return (
    <main className={styles.container}>
      <span className={styles.input_wrapper}>
        <input ref={ref} placeholder="搜索" onKeyDown={handleEnterDown} />
        <VscSearch />
      </span>
    </main>
  )
}
