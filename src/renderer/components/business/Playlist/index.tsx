import React from 'react'

import { path } from '@/path'

import { Link } from '../Link'

import styles from './Playlist.module.scss'

export type PlaylistProps = {
  playlist: {
    id: number
    name: string
    trackCount: number
    coverImgUrl: string
    creator: {
      userId: number
      nickname: string
    }
  }
}

export const Playlist: React.FC<PlaylistProps> = ({ playlist }) => {
  return (
    <div className={styles.container}>
      <Link href={path.playlist(playlist.id)}>
        <img src={playlist.coverImgUrl} alt="cover image" />
      </Link>

      <Link href={path.playlist(playlist.id)}>
        <span className={styles.name}>{playlist.name}</span>
      </Link>

      <span className={styles.count}>{playlist.trackCount}首</span>

      <Link href={path.user(playlist.creator.userId)}>
        <span className={styles.creater}>{playlist.creator.nickname}</span>
      </Link>
    </div>
  )
}

export default Playlist
