import c from 'classnames'
import Link from 'next/link'

import { SongSnapshotIn } from '@/models'
import { path } from '@/path'

import styles from './Authors.module.scss'

export type AuthorsProps = {
  song: SongSnapshotIn
  className?: string
}

export const Authors: React.FC<AuthorsProps> = ({ song, className }) => {
  return (
    <div className={c(styles.container, className)}>
      {song.ar
        ?.map((author) => (
          <Link href={path.artist({ id: author.id })}>
            <span className={styles.author}>{author.name}</span>
          </Link>
        ))
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
