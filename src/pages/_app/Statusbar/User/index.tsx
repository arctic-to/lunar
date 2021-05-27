import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { RiUserFollowLine, RiUserLine } from 'react-icons/ri'

import { Modal } from '@/components'
import { useUserAccount } from '@/data'
import { useBoolean } from '@/hooks'
import { usePlatform } from '@/models'
import { path } from '@/path'

import LoginForm from './LoginForm'
import styles from './User.module.scss'

export default function User() {
  const [opened, openModal, closeModal] = useBoolean(false)
  const { netease } = usePlatform()
  const router = useRouter()

  const { data } = useUserAccount()

  const gotoProfile = useCallback(() => {
    if (data?.profile) router.push(path.user(data.profile.userId))
  }, [data?.profile, router])

  if (data) {
    netease?.setAccount(data.account)
    netease?.setProfile(data.profile)
  }

  return (
    <div className={styles.container}>
      {data?.profile ? (
        <RiUserFollowLine className={styles.logged} onClick={gotoProfile} />
      ) : (
        <>
          <RiUserLine onClick={openModal} />
          <Modal opened={opened} close={closeModal}>
            <LoginForm />
          </Modal>
        </>
      )}
    </div>
  )
}
