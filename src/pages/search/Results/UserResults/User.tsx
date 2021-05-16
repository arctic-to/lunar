import { UserResultSnapshotIn } from '@/models'

import styles from './User.module.scss'

export type UserProps = { userprofile: UserResultSnapshotIn }

export const User: React.FC<UserProps> = ({ userprofile }) => {
  return (
    <div className={styles.container}>
      <img src={userprofile.avatarUrl} alt="cover image" />
      <div className={styles.userinfo}>
        <div className={styles.name}>{userprofile.nickname}</div>
        <div className={styles.bio}>{userprofile.signature}</div>
      </div>
    </div>
  )
}

export default User
