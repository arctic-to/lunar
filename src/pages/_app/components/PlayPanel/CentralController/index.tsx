import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'

import { useCurrentTrack, usePlayer } from '@/models'

import Buttons from './Buttons'
import styles from './CentralController.module.scss'
import ProgressSlider from './ProgressSlider'

export const CentralController: React.VFC = observer(() => {
  const ref = useRef<HTMLAudioElement>(null)
  const player = usePlayer()
  const currentTrack = useCurrentTrack()

  useEffect(() => {
    if (currentTrack && ref.current) {
      ref.current.addEventListener('ended', player.handleEnded)
      // Should replace previous event handler
      ref.current.onplay = currentTrack.observeCurrentTime
      ref.current.onpause = currentTrack.unobserveCurrentTime
    }
  }, [currentTrack, player.handleEnded])

  useEffect(() => {
    if (currentTrack && ref.current) {
      ref.current.currentTime = currentTrack.currentTimeInSecond
    }
    /**
     * Ignore the updates of `currentTimeInSecond`, cause it is
     * updated continually if audio is playing.
     */
  }, [currentTrack, currentTrack?.currentTimeSetTimes])

  useEffect(() => {
    if (currentTrack && ref.current) {
      ref.current.volume = player.volume * currentTrack.volume
    }
  }, [currentTrack, currentTrack?.volume, player.volume])

  useEffect(() => {
    if (!(currentTrack && currentTrack.songUrl && ref.current)) return

    if (currentTrack.playing) {
      ref.current.play()
    } else {
      ref.current.pause()
    }
  }, [currentTrack, currentTrack?.playing, currentTrack?.songUrl])

  return (
    <div className={styles.container}>
      <Buttons />
      <ProgressSlider />

      <audio src={currentTrack?.songUrl} ref={ref} />
    </div>
  )
})

export default CentralController
