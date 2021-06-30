import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useCallback } from 'react'
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc'

import { SearchInput } from '@/components'
import { useHistory } from '@/hooks'
import { path } from '@/path'
import { isDev } from '@/utils'

import styles from './Header.module.scss'
import WindowOperations from './WindowOperations'
import Button from './components/Button'

export default function Header() {
  const history = useHistory()
  const router = useRouter()

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') {
        const keywords = e.currentTarget.value
        router.push(path.search({ keywords }))
      }
    },
    [router],
  )

  /** Assigning `history?.back` to onClick will case a error. */
  const back = useCallback(() => {
    history?.back()
  }, [history])

  const forward = useCallback(() => {
    history?.forward()
  }, [history])

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href="/">
          <div className={styles.logo}>
            <img src={isDev ? '/favicon.dev.png' : '/favicon.png'} />
          </div>
        </Link>
        <div className={styles.router_controller}>
          <Button onClick={back}>
            <VscChevronLeft />
          </Button>
          <Button onClick={forward}>
            <VscChevronRight />
          </Button>
        </div>
        <SearchInput
          className={styles.search_input}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className={styles.right}>
        <WindowOperations />
      </div>
    </header>
  )
}
