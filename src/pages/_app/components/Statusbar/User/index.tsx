import { VscAccount } from 'react-icons/vsc'

import { Modal } from '@/components'
import { useUserAccount } from '@/data'
import { useBoolean } from '@/hooks'
import { usePlatform } from '@/models'

import LoginForm from './LoginForm'
import styles from './User.module.scss'

export default function User() {
  const [opened, openModal, closeModal] = useBoolean(false)
  const platform = usePlatform()
  const { data } = useUserAccount()

  if (data) platform.updateNetease(data)

  return (
    <div className={styles.container}>
      {data ? (
        <img src={data.profile.avatarUrl} className={styles.avatar} />
      ) : (
        <>
          <VscAccount onClick={openModal} className={styles.avatar} />
          <Modal opened={opened} close={closeModal}>
            <LoginForm />
          </Modal>
        </>
      )}
    </div>
  )
}
