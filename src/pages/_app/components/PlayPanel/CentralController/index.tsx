import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useRef } from 'react'
import {
  RiRepeat2Line,
  RiShuffleLine,
  RiRepeatOneLine,
  RiPauseFill,
  RiPlayFill,
  RiSkipBackFill,
  RiSkipForwardFill,
} from 'react-icons/ri'

import { useCurrentTrack } from '../hooks'

import styles from './CentralController.module.scss'
import ProgressSlider from './ProgressSlider'

export const CentralController: React.VFC = observer(() => {
  const ref = useRef<HTMLAudioElement>(null)
  const currentTrack = useCurrentTrack()

  const handleClick = useCallback((e: React.MouseEvent) => {
    // eslint-disable-next-line no-console
    console.log(e.currentTarget)
  }, [])

  useEffect(() => {
    if (currentTrack && ref.current) {
      ref.current.currentTime = currentTrack.currentTimeInSecond
    }
  }, [currentTrack, currentTrack?.currentTimeSetTimes])

  useEffect(() => {
    if (currentTrack && ref.current) {
      ref.current.volume = currentTrack.volume
    }
  }, [currentTrack, currentTrack?.volume])

  useEffect(() => {
    if (!(currentTrack && currentTrack.songUrl && ref.current)) return

    if (currentTrack.playing) {
      ref.current.play()
      currentTrack.observeCurrentTime()
    } else {
      ref.current.pause()
      currentTrack.unobserveCurrentTime()
    }
  }, [currentTrack, currentTrack?.playing, currentTrack?.songUrl])

  const play = useCallback(() => {
    currentTrack?.play()
  }, [currentTrack])

  const pause = useCallback(() => {
    currentTrack?.pause()
  }, [currentTrack])

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <div onClick={handleClick}>
          <RiRepeat2Line />
          <RiShuffleLine />
          <RiRepeatOneLine />
        </div>
        <div>
          <RiSkipBackFill />
          {currentTrack?.playing ? (
            <RiPauseFill onClick={pause} />
          ) : (
            <RiPlayFill onClick={play} />
          )}
          <RiSkipForwardFill />
        </div>
      </div>

      <ProgressSlider />

      {currentTrack?.songUrl && <audio src={currentTrack.songUrl} ref={ref} />}
    </div>
  )
})

export default CentralController
