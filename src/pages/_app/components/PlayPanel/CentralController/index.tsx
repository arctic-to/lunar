import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'

import { useCurrentTrack } from '../hooks'

import Buttons from './Buttons'
import styles from './CentralController.module.scss'
import ProgressSlider from './ProgressSlider'

export const CentralController: React.VFC = observer(() => {
  const ref = useRef<HTMLAudioElement>(null)
  const currentTrack = useCurrentTrack()

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

  return (
    <div className={styles.container}>
      <Buttons />
      <ProgressSlider />

      {currentTrack?.songUrl && <audio src={currentTrack.songUrl} ref={ref} />}
    </div>
  )
})

export default CentralController
