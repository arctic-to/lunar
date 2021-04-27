import React from 'react'
import { RiLoader5Fill } from 'react-icons/ri'

import styles from './Loader.module.scss'

export const Loader: React.VFC = () => {
  return <RiLoader5Fill className={styles.loader} />
}

export default Loader
