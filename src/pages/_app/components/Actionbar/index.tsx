import { RiHeart3Line, RiPlayListFill } from 'react-icons/ri'
import { VscSearch } from 'react-icons/vsc'

import styles from './Actionbar.module.scss'

export const Actionbar: React.VFC = () => {
  return (
    <div className={styles.container}>
      <VscSearch />
      <RiHeart3Line />
      <RiPlayListFill />
    </div>
  )
}

export default Actionbar
