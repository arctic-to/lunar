import Link from 'next/link'

import styles from './Header.module.scss'
import Menu from './Menu'
import WindowOperations from './WindowOperations'

export default function Header() {
  return (
    <header className={styles.head}>
      <Link href="/">
        <a>
          <img className={styles.logo} src="/favicon.ico" />
        </a>
      </Link>

      <div className={styles.right}>
        <Menu />
        <WindowOperations />
      </div>
    </header>
  )
}
