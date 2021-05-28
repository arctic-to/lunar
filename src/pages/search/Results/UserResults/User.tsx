import React from 'react'

import { Link } from '@/components'
import { UserResultSnapshotIn } from '@/models'
import { path } from '@/path'

import styles from './User.module.scss'

export type UserProps = { userprofile: UserResultSnapshotIn }

export const User: React.FC<UserProps> = ({ userprofile }) => {
  return (
    <div className={styles.container}>
      <Link href={path.user(userprofile.userId)}>
        <img src={userprofile.avatarUrl} alt="cover image" />
      </Link>

      <div className={styles.userinfo}>
        <Link href={path.user(userprofile.userId)}>
          <div className={styles.name}>{userprofile.nickname}</div>
        </Link>
        <div className={styles.bio}>{userprofile.signature}</div>
      </div>
    </div>
  )
}

export default User
