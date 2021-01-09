import c from 'classnames'

import { SongSnapshot } from '@/models'

import styles from './Authors.module.scss'

export type AuthorsProps = {
  song: SongSnapshot
  className: string
}

export const Authors: React.FC<AuthorsProps> = ({ song, className }) => {
  return (
    <div className={c(styles.container, className)}>
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
