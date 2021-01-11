import styles from './Statusbar.module.scss'
import User from './User'

export const Statusbar: React.VFC = () => {
  return (
    <div className={styles.container}>
      <User />
    </div>
  )
}

export default Statusbar
