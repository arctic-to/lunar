import styles from './ProgressBar.module.scss'

export type ProgressBarProps = {
  width?: number
  height?: number
  percentage?: number
}

export const ProgressBar: React.VFC<ProgressBarProps> = ({
  width = 80,
  height = 8,
  percentage = 0,
}) => {
  return (
    <div className={styles.track} style={{ width, height }}>
      <div className={styles.fill} style={{ width: `${percentage * 100}%` }} />
    </div>
  )
}

export default ProgressBar
