import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

import { useLikelist } from '@/data'
import { usePlatform } from '@/models'

import styles from './Statusbar.module.scss'
import User from './User'

export const Statusbar: React.VFC = observer(() => {
  const { netease } = usePlatform()

  const { data } = useLikelist()

  useEffect(() => {
    if (data) netease.setLikelist(data)
  }, [data, netease])

  return (
    <div className={styles.container}>
      <User />
    </div>
  )
})

export default Statusbar
