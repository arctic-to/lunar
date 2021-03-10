import c from 'classnames'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'
import {
  RiRepeat2Line,
  RiShuffleLine,
  RiRepeatOneLine,
  RiPauseFill,
  RiPlayFill,
  RiSkipBackFill,
  RiSkipForwardFill,
} from 'react-icons/ri'

import { useLike } from '@/data'
import { useLiked } from '@/hooks'
import { IconLyric } from '@/icons'
import { OrderEnum, useCurrentTrack, usePlayer } from '@/models'

import styles from './Buttons.module.scss'

export const Buttons: React.VFC = observer(() => {
  const currentTrack = useCurrentTrack()
  const {
    play,
    pause,
    playPrev,
    playNext,
    order,
    repeat,
    shuffle,
    repeatOne,
    lyric,
  } = usePlayer()
  const songId = currentTrack?.song.id

  const [like, unlike] = useLike(songId)
  const liked = useLiked(songId)

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
          className={c({ [styles.active]: lyric.opened })}
          onClick={lyric.toggle}
        />
        {liked ? (
          <IoMdHeart className={styles.fav} onClick={unlike} />
        ) : (
          <IoMdHeartEmpty onClick={like} />
        )}
      </div>
    </div>
  )
})

export default Buttons
