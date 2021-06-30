import React from 'react'

import { useUserDetail } from '@/data'

import Playlists from './Playlists'
import Recent from './Recent'
import styles from './profile.module.scss'
import { useId } from './useId'

export const Profile: React.FC = () => {
  const id = useId()
  const { data } = useUserDetail(id)

  if (!data) return null

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.img_container}>
          <img
            src={data.profile.avatarUrl}
            alt="Avatar"
            width={200}
            height={200}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            <div className={styles.name}>{data.profile.nickname}</div>
            <span className={styles.level}>Lv{data.level}</span>
            {data.profile.vipType && (
              <span className={styles.vip_level}>VIP</span>
            )}
          </div>
          <div className={styles.bio}>{data.profile.signature}</div>
        </div>
      </div>

      {data.peopleCanSeeMyPlayRecord && <Recent />}
      <Playlists />
    </div>
  )
}

export default Profile
