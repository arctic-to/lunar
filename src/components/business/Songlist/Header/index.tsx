import styles from './Header.module.scss'

export const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      <span className={styles.index} />
      <span className={styles.icon} />
      <span className={styles.name}>歌名</span>
      <span className={styles.artist}>歌手</span>
      <span className={styles.album}>专辑</span>
      <span className={styles.duration}>时长</span>
      <span className={styles.pop}>热度</span>
    </div>
  )
}

export default Header
