import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { RiUserFollowLine, RiUserLine } from 'react-icons/ri'

import { Modal } from '@/components'
import { useUserAccount } from '@/data'
import { useBoolean } from '@/hooks'
import { usePlatform } from '@/models'
import { path } from '@/path'

import LoginForm from './LoginForm'
import styles from './User.module.scss'

export const User = observer(() => {
  const [opened, openModal, closeModal] = useBoolean(false)
  const [isLogined, setIsLogined] = useState(false)

  const { netease } = usePlatform()
  const router = useRouter()

  const { data } = useUserAccount()

  useEffect(() => {
    if (data?.profile) setIsLogined(true)
  }, [data?.profile, setIsLogined])

  const gotoProfile = useCallback(() => {
    if (netease.profile) router.push(path.user(netease.profile.userId))
  }, [netease.profile, router])

  const handleSuccess = useCallback(() => {
    setIsLogined(true)
    closeModal()
  }, [closeModal])

  return (
    <div className={styles.container}>
      {isLogined ? (
        <RiUserFollowLine className={styles.logged} onClick={gotoProfile} />
      ) : (
        <>
          <RiUserLine onClick={openModal} />
          <Modal opened={opened} close={closeModal}>
            <LoginForm onSuccess={handleSuccess} />
          </Modal>
        </>
      )}
    </div>
  )
})

export default User
