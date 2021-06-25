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
import { OrderEnum, usePlayer } from '@/models'
import { withDivider } from '@/utils'

import styles from './Header.module.scss'

interface HeaderProps {
  hovering: boolean
}
export const Header: React.FC<HeaderProps> = observer(({ hovering }) => {
  const {
    order,
    lyric,
    currTrack,
    __LYRIC__PROCESS__Pause__,
    __LYRIC__PROCESS__PlayPrev__,
    __LYRIC__PROCESS__PlayNext__,
    __LYRIC__PROCESS__Play__,
    __LYRIC__PROCESS__RepeatOne__,
    __LYRIC__PROCESS__Repeat__,
    __LYRIC__PROCESS__Shuffle__,
  } = usePlayer()

  const buttonGroups = useMemo(
    () => [
      [
        <RiSkipBackFill onClick={__LYRIC__PROCESS__PlayPrev__} />,
        currTrack?.playing ? (
          <RiPauseFill onClick={__LYRIC__PROCESS__Pause__} />
        ) : (
          <RiPlayFill onClick={__LYRIC__PROCESS__Play__} />
        ),
        <RiSkipForwardFill onClick={__LYRIC__PROCESS__PlayNext__} />,
      ],
      [
        <RiRepeat2Line
          className={c({ [styles.active]: order === OrderEnum.Repeat })}
          onClick={__LYRIC__PROCESS__Repeat__}
        />,
        <RiShuffleLine
          className={c({ [styles.active]: order === OrderEnum.Shuffle })}
          onClick={__LYRIC__PROCESS__Shuffle__}
        />,
        <RiRepeatOneLine
          className={c({ [styles.active]: order === OrderEnum.RepeatOne })}
          onClick={__LYRIC__PROCESS__RepeatOne__}
        />,
      ],
      [
        <IconTranslate
          className={c(styles.text_button, {
            [styles.active]: lyric.translation,
          })}
          onClick={lyric.__LYRIC__PROCESS__ToggleTranslation__}
        />,
        <div
          className={c(styles.text_button, {
            [styles.active]: lyric.phonetic,
          })}
          onClick={lyric.__LYRIC__PROCESS__TogglePhonetic__}
        >
          ɪ
        </div>,
      ],
      [
        <IconOverlay
          className={c({
            [styles.active]: lyric.overlay,
          })}
          onClick={lyric.__LYRIC__PROCESS__ToggleOverlay__}
        />,
        <IoClose onClick={lyric.__LYRIC__PROCESS__Toggle__} />,
      ],
    ],
    [
      __LYRIC__PROCESS__Pause__,
      __LYRIC__PROCESS__PlayNext__,
      __LYRIC__PROCESS__PlayPrev__,
      __LYRIC__PROCESS__Play__,
      __LYRIC__PROCESS__RepeatOne__,
      __LYRIC__PROCESS__Repeat__,
      __LYRIC__PROCESS__Shuffle__,
      currTrack?.playing,
      lyric.__LYRIC__PROCESS__ToggleOverlay__,
      lyric.__LYRIC__PROCESS__TogglePhonetic__,
      lyric.__LYRIC__PROCESS__ToggleTranslation__,
      lyric.__LYRIC__PROCESS__Toggle__,
      lyric.overlay,
      lyric.phonetic,
      lyric.translation,
      order,
    ],
  )

  const visible = lyric.overlay || hovering

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
