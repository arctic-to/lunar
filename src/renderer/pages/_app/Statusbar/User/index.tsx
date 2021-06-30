import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { RiUserFollowLine, RiUserLine } from 'react-icons/ri'
import { Object } from 'ts-toolbelt'

import { Modal } from '@/components'
import { useUserAccount } from '@/data'
import { useBoolean } from '@/hooks'
import { usePlatform } from '@/models'
import { path } from '@/path'

import LoginForm, { LoginData } from './LoginForm'
import styles from './User.module.scss'

export const User = observer(() => {
  const [opened, openModal, closeModal] = useBoolean(false)
  const [isLogined, setIsLogined] = useState(false)

  const { netease } = usePlatform()
  const router = useRouter()

  const { data } = useUserAccount()

  const updateLoginState = useCallback(
    (data: LoginData) => {
      netease.setAccount(data.account)
      netease.setProfile(data.profile)
      setIsLogined(true)
    },
    [netease],
  )

  useEffect(() => {
    if (data && data.account && data.profile) {
      updateLoginState(
        data as Object.NonNullable<typeof data, 'account' | 'profile'>,
      )
    }
  }, [data, updateLoginState])

  const gotoProfile = useCallback(() => {
    if (netease.profile) router.push(path.user(netease.profile.userId))
  }, [netease.profile, router])

  const handleSuccess = useCallback(
    (data: LoginData) => {
      updateLoginState(data)
      closeModal()
    },
    [closeModal, updateLoginState],
  )

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
