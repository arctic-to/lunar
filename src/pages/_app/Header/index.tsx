import Link from 'next/link'
import React from 'react'
import { useCallback } from 'react'
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc'

import { SearchInput } from '@/components'
import { useHistory } from '@/hooks'

import styles from './Header.module.scss'
import WindowOperations from './WindowOperations'
import Button from './components/Button'

export default function Header() {
  const history = useHistory()

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
          <div className={styles.logo}></div>
        </Link>
        <div className={styles.router_controller}>
          <Button onClick={back}>
            <VscChevronLeft />
          </Button>
          <Button onClick={forward}>
            <VscChevronRight />
          </Button>
        </div>
        <SearchInput className={styles.search_input} />
      </div>

      <div className={styles.right}>
        <WindowOperations />
      </div>
    </header>
  )
}
