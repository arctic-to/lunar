import React from 'react'
import { IoClose } from 'react-icons/io5'
import {
  RiPlayFill,
  RiRepeat2Line,
  RiRepeatOneLine,
  RiShuffleLine,
  RiSkipBackFill,
  RiSkipForwardFill,
} from 'react-icons/ri'

import { withDivider } from '@/utils'

import styles from './Header.module.scss'

interface HeaderProps {
  hidden: boolean
}
export const Header: React.FC<HeaderProps> = ({ hidden }) => {
  const buttonGroups = [
    [<RiSkipBackFill />, <RiPlayFill />, <RiSkipForwardFill />],
    [<RiRepeat2Line />, <RiShuffleLine />, <RiRepeatOneLine />],
    ['文', 'あ', 'ɪ'].map((t) => <div className={styles.text_button}>{t}</div>),
    [<IoClose />],
  ]
  return (
    <div
      className={styles.container}
      style={{ visibility: hidden ? 'hidden' : undefined }}
    >
      {withDivider(
        buttonGroups.map((buttonGroup) => (
          <div className={styles.button_group}>
            {buttonGroup.map((button) => (
              <div className={styles.button_container}>{button}</div>
            ))}
          </div>
        )),
        <div className={styles.divider} />,
      )}
    </div>
  )
}

export default Header
