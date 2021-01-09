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

import { useCurrentTrack } from '../../hooks'

import styles from './Buttons.module.scss'

export const Buttons: React.VFC = observer(() => {
  const currentTrack = useCurrentTrack()

  const handleClick = useCallback((e: React.MouseEvent) => {
    // eslint-disable-next-line no-console
    console.log(e.currentTarget)
  }, [])

  const play = useCallback(() => {
    currentTrack?.play()
  }, [currentTrack])

  const pause = useCallback(() => {
    currentTrack?.pause()
  }, [currentTrack])

  return (
    <div className={styles.container}>
      <div className={styles.left} onClick={handleClick}>
        <RiRepeat2Line />
        <RiShuffleLine />
        <RiRepeatOneLine />
      </div>
      <div className={styles.middle}>
        <RiSkipBackFill />
        {currentTrack?.playing ? (
          <RiPauseFill onClick={pause} className={styles.pause} />
        ) : (
          <RiPlayFill onClick={play} className={styles.play} />
        )}
        <RiSkipForwardFill />
      </div>
      <div className={styles.right}>
        <Lyric />
      </div>
    </div>
  )
})

export default Buttons
