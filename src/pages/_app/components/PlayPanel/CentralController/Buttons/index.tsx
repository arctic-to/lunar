import c from 'classnames'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import {
  RiRepeat2Line,
  RiShuffleLine,
  RiRepeatOneLine,
  RiPauseFill,
  RiPlayFill,
  RiSkipBackFill,
  RiSkipForwardFill,
} from 'react-icons/ri'

import { Lyric } from '@/icons'
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
  } = usePlayer()

  const handleClick = useCallback((e: React.MouseEvent) => {
    // eslint-disable-next-line no-console
    console.log(e.currentTarget)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.left} onClick={handleClick}>
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
        <Lyric />
      </div>
    </div>
  )
})

export default Buttons
