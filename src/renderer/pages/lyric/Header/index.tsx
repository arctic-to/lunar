import c from 'classnames'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'
import { IoClose } from 'react-icons/io5'
import {
  RiPauseFill,
  RiPlayFill,
  RiRepeat2Line,
  RiRepeatOneLine,
  RiShuffleLine,
  RiSkipBackFill,
  RiSkipForwardFill,
} from 'react-icons/ri'

import IconOverlay from '@/icons/Overlay'
import IconTranslate from '@/icons/Translate'
import { OrderEnum } from '@/models'
import { withDivider } from '@/utils'

import { useActionIpc } from '../ipc'
import { useLyricStore } from '../store'

import styles from './Header.module.scss'

interface HeaderProps {
  hovering: boolean
}
export const Header: React.FC<HeaderProps> = observer(({ hovering }) => {
  const {
    translation,
    toggleTranslation,
    phonetic,
    togglePhonetic,
    overlay,
    toggleOverlay,
    order,
    playing,
  } = useLyricStore()

  const actions = useActionIpc()

  const buttonGroups = useMemo(
    () => [
      [
        <RiSkipBackFill onClick={actions.playPrev} />,
        playing ? (
          <RiPauseFill onClick={actions.pause} />
        ) : (
          <RiPlayFill onClick={actions.play} />
        ),
        <RiSkipForwardFill onClick={actions.playNext} />,
      ],
      [
        <RiRepeat2Line
          className={c({ [styles.active]: order === OrderEnum.Repeat })}
          onClick={actions.repeat}
        />,
        <RiShuffleLine
          className={c({ [styles.active]: order === OrderEnum.Shuffle })}
          onClick={actions.shuffle}
        />,
        <RiRepeatOneLine
          className={c({ [styles.active]: order === OrderEnum.RepeatOne })}
          onClick={actions.repeatOne}
        />,
      ],
      [
        <IconTranslate
          className={c({
            [styles.active]: translation,
          })}
          onClick={toggleTranslation}
        />,
        <div
          className={c(styles.text_button, {
            [styles.active]: phonetic,
          })}
          onClick={togglePhonetic}
        >
          ɪ
        </div>,
      ],
      [
        <IconOverlay
          className={c({
            [styles.active]: overlay,
          })}
          onClick={toggleOverlay}
        />,
        <IoClose onClick={actions.hideLyric} />,
      ],
    ],
    [
      actions.playPrev,
      actions.pause,
      actions.play,
      actions.playNext,
      actions.repeat,
      actions.shuffle,
      actions.repeatOne,
      actions.hideLyric,
      playing,
      order,
      translation,
      toggleTranslation,
      phonetic,
      togglePhonetic,
      overlay,
      toggleOverlay,
    ],
  )

  const visible = overlay || hovering

  return (
    <div
      className={styles.container}
      style={{ visibility: visible ? undefined : 'hidden' }}
    >
      {withDivider(
        buttonGroups.map((buttonGroup, index) => (
          <div key={index} className={styles.button_group}>
            {buttonGroup.map((button, index) => (
              <div key={index} className={styles.button_container}>
                {button}
              </div>
            ))}
          </div>
        )),
        <div className={styles.divider} />,
      )}
    </div>
  )
})

export default Header
