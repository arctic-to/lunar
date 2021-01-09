import { VscAccount } from 'react-icons/vsc'

import { Modal } from '@/components'
import { useUser } from '@/data'
import { useBoolean } from '@/hooks'

import LoginForm from './LoginForm'
import styles from './User.module.scss'

export default function User() {
  const [opened, openModal, closeModal] = useBoolean(false)
  const { data } = useUser()

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
