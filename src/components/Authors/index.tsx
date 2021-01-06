import { SongSnapshot } from '@/models'

import styles from './Authors.module.scss'

export type AuthorsProps = { song: SongSnapshot }

export const Authors: React.VFC<AuthorsProps> = ({ song }) => {
  return (
    <div className={styles.container}>
      {song.ar
        .map((author) => <span>{author.name}</span>)
        .reduce((acc, cur) => {
          return (
            <>
              {acc} / {cur}
            </>
          )
        })}
    </div>
  )
}

export default Authors
