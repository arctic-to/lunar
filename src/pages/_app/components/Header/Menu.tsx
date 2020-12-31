import { Modal } from '@/components'
import { useBoolean } from '@/hooks'
import { useUser } from '@/models'

import Login from '../Login'

import styles from './Menu.module.scss'

export default function Menu() {
  const [opened, openModal, closeModal] = useBoolean(false)
  const { data } = useUser()

  return (
    <div className={styles.menu}>
      {data ? (
        <img src={data.profile.avatarUrl} className={styles.avatar} />
      ) : (
        <>
          <button onClick={openModal}>登录</button>
          <Modal opened={opened} close={closeModal}>
            <Login />
          </Modal>
        </>
      )}
    </div>
  )
}
