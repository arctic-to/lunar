import styles from './SashContainer.module.scss'

export const SashContainer: React.FC = ({ children }) => {
  return <div className={styles.sash_container}>{children}</div>
}
