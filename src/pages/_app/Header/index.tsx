import Link from 'next/link'

import styles from './Header.module.scss'
import WindowOperations from './WindowOperations'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logo}></div>
      </Link>

      <div className={styles.right}>
        <WindowOperations />
      </div>
    </header>
  )
}
