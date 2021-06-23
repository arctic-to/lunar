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
import { usePlayNext } from '@/hooks'
import { IconLyric } from '@/icons'
import { OrderEnum, useCurrentTrack, usePlayer } from '@/models'

import styles from './Buttons.module.scss'

export const Buttons: React.VFC = observer(() => {
  const currentTrack = useCurrentTrack()
  const playNext = usePlayNext()
  const { play, pause, playPrev, order, repeat, shuffle, repeatOne, lyric } =
    usePlayer()

  return (
    <div className={styles.container}>
      <div className={styles.left}>
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
      </div>
      <div className={styles.middle}>
        <RiSkipBackFill onClick={playPrev} />
        {currentTrack?.playing ? (
          <RiPauseFill onClick={pause} className={styles.pause} />
        ) : (
          <RiPlayFill onClick={play} className={styles.play} />
        )}
        <RiSkipForwardFill onClick={playNext} />
      </div>
      <div className={styles.right}>
        <IconLyric
          className={c({ [styles.active]: lyric.show })}
          onClick={lyric.toggle}
        />
        <Like songId={currentTrack?.song.id} />
      </div>
    </div>
  )
})

export default Buttons
