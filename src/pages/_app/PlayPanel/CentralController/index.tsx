import { observer } from 'mobx-react-lite'
import { getSnapshot } from 'mobx-state-tree'
import { useCallback, useEffect, useRef } from 'react'

import { useNextTrackIndex } from '@/hooks'
import { OrderEnum, useCurrentTrack, usePlayer } from '@/models'

import Buttons from './Buttons'
import styles from './CentralController.module.scss'
import ProgressSlider from './ProgressSlider'

export const CentralController: React.VFC = observer(() => {
  const ref = useRef<HTMLAudioElement>(null)
  const { order, playNext, replay, volume, setNextTrack, queue } = usePlayer()
  const currentTrack = useCurrentTrack()
  const nextTrackIndex = useNextTrackIndex()

  const handleEnded = useCallback(() => {
    switch (order) {
      case OrderEnum.Repeat:
      case OrderEnum.Shuffle: {
        playNext()
        break
      }
      case OrderEnum.RepeatOne: {
        replay()
      }
    }
  }, [order, playNext, replay])

  useEffect(() => {
    if (currentTrack?.song) {
      setNextTrack({
        song: getSnapshot(queue.modGet(nextTrackIndex)),
      })
    }
  }, [currentTrack?.song, nextTrackIndex, queue, setNextTrack])

  useEffect(() => {
    if (currentTrack && ref.current) {
      // Should replace previous event handler
      ref.current.onended = handleEnded
      ref.current.onplay = currentTrack.currentTimeObserver()
      ref.current.onpause = currentTrack.unobserveCurrentTime
    }
  }, [currentTrack, handleEnded])

  useEffect(() => {
    /** `currentTime` can be set when <audio> has non-empty `src`(currentTrack.songUrl). */
    if (currentTrack && currentTrack.songUrl && ref.current) {
      ref.current.currentTime = currentTrack.currentTimeInSecond
    }
    /**
     * Ignore the updates of `currentTimeInSecond`, cause it is
     * updated continually if audio is playing.
     */
  }, [currentTrack, currentTrack?.songUrl, currentTrack?.currentTimeSetTimes])

  useEffect(() => {
    if (currentTrack && ref.current) {
      ref.current.volume = volume * currentTrack.volume
    }
  }, [currentTrack, currentTrack?.volume, volume])

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
