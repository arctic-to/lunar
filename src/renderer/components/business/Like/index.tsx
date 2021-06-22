import React from 'react'
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri'

import { useLike } from '@/data'
import { useLiked } from '@/hooks'

import styles from './Like.module.scss'

export type LikeProps = { songId: number | undefined }
export const Like: React.FC<LikeProps> = ({ songId }) => {
  const [like, unlike] = useLike(songId)
  const liked = useLiked(songId)

  return (
    <>
      {liked ? (
        <RiHeart3Fill className={styles.liked} onClick={unlike} />
      ) : (
        <RiHeart3Line className={styles.unliked} onClick={like} />
      )}
    </>
  )
}

export default Like
