import styles from './Home.module.scss'
import { DailySongs } from './components'

export default function Home() {
  return (
    <main className={styles.container}>
      <DailySongs />
    </main>
  )
}
