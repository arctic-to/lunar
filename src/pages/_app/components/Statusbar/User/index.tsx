import { RiUserFollowLine, RiUserLine } from 'react-icons/ri'

import { Modal } from '@/components'
import { useUserAccount } from '@/data'
import { useBoolean } from '@/hooks'
import { usePlatform } from '@/models'

import LoginForm from './LoginForm'
import styles from './User.module.scss'

export default function User() {
  const [opened, openModal, closeModal] = useBoolean(false)
  const { netease } = usePlatform()

  const { data } = useUserAccount()

  if (data) {
    netease?.setAccount(data.account)
    netease?.setProfile(data.profile)
  }

  return (
    <div className={styles.container}>
      {data?.profile ? (
        <RiUserFollowLine className={styles.logged} />
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
