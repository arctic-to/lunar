import styles from './Tag.module.scss'

export type TagBaseProps = {
  tagName: string
}
export const TagBase: React.FC<TagBaseProps> = ({ tagName }) => {
  return (
    <div className={styles.container}>
      <span>{tagName}</span>
    </div>
  )
}

export default TagBase
