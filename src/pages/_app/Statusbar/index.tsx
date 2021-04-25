import { observer } from 'mobx-react-lite'

import { useLikelist } from '@/data'
import { usePlatform } from '@/models'

import styles from './Statusbar.module.scss'
import User from './User'

export const Statusbar: React.VFC = observer(() => {
  const { netease } = usePlatform()

  const { data } = useLikelist()

  if (data) netease?.setLikelist(data)

  return (
    <div className={styles.container}>
      <User />
    </div>
  )
})

export default Statusbar
