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

export const CentralController: React.VFC = observer(() => {
  const ref = useRef<HTMLAudioElement>(null)
  const currentTrack = useCurrentTrack()

  const handleClick = useCallback((e: React.MouseEvent) => {
    // eslint-disable-next-line no-console
    console.log(e.currentTarget)
  }, [])

  useEffect(() => {
    if (currentTrack) {
      currentTrack.playing ? ref.current?.play() : ref.current?.pause()
    }
  }, [currentTrack, currentTrack?.playing])

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
      <div></div>

      <audio src={currentTrack?.songUrl} ref={ref} />
    </div>
  )
})

export default CentralController
