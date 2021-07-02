import c from 'classnames'
import { observer } from 'mobx-react-lite'
import React from 'react'
import {
  RiRepeat2Line,
  RiShuffleLine,
  RiRepeatOneLine,
  RiPauseFill,
  RiPlayFill,
  RiSkipBackFill,
  RiSkipForwardFill,
} from 'react-icons/ri'

import { Like } from '@/components'
import { IconLyric } from '@/icons'
import { OrderEnum, usePlayer } from '@/models'

import styles from './Buttons.module.scss'

export const Buttons: React.VFC = observer(() => {
  const {
    track,
    playPrev,
    playNext,
    order,
    repeat,
    shuffle,
    repeatOne,
    osdLyric,
  } = usePlayer()
  const { play, pause } = track

  return (
    <div className={styles.container}>
      <RiRepeat2Line
        className={c({ [styles.active]: order === OrderEnum.Repeat })}
        onClick={repeat}
      />
      <RiShuffleLine
        className={c({ [styles.active]: order === OrderEnum.Shuffle })}
        onClick={shuffle}
      />
      <RiRepeatOneLine
        className={c({ [styles.active]: order === OrderEnum.RepeatOne })}
        onClick={repeatOne}
      />

      <RiSkipBackFill onClick={playPrev} />
      {track.playing ? (
        <RiPauseFill onClick={pause} className={styles.pause} />
      ) : (
        <RiPlayFill onClick={play} className={styles.play} />
      )}
      <RiSkipForwardFill onClick={playNext} />

      <IconLyric
        className={c({ [styles.active]: osdLyric.show })}
        onClick={osdLyric.toggle}
      />
      <Like songId={track.song?.id} />
    </div>
  )
})

export default Buttons
