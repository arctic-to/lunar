import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useRef } from 'react'

import { useNextSongIndex } from '@/hooks'
import { OrderEnum, usePlayer } from '@/models'

import Buttons from './Buttons'
import styles from './CentralController.module.scss'
import ProgressSlider from './ProgressSlider'

export const CentralController: React.VFC = observer(() => {
  const ref = useRef<HTMLAudioElement>(null)
  const { order, playNext, replay, track, setNextSong, queue } = usePlayer()
  const nextSongIndex = useNextSongIndex()

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
    // audio will pause when it ends
    ref.current?.play()
  }, [order, playNext, replay])

  useEffect(() => {
    const song = queue.modGet(nextSongIndex)
    if (track.song && queue.size && song) {
      setNextSong(song)
    }
  }, [track.song, nextSongIndex, queue, setNextSong])

  useEffect(() => {
    if (track && ref.current) {
      // Should replace previous event handler
      ref.current.onended = handleEnded
      ref.current.onplay = track.observeCurrentTime
      ref.current.onpause = track.unobserveCurrentTime
    }
  }, [track, handleEnded])

  useEffect(() => {
    // `currentTime` can be set when <audio> has non-empty `src`(track.song.url).
    if (track.song?.url && ref.current) {
      ref.current.currentTime = track.currentTimeInSecond
    }
    // set `currentTime` of <audio> manually
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.currentTimeSetTimes])

  useEffect(() => {
    if (track && ref.current) {
      ref.current.volume = track.volume
    }
  }, [track, track.volume])

  useEffect(() => {
    if (track.song?.url === undefined || !ref.current) return

    if (track.song.url === '') {
      playNext()
      return
    }

    if (track.playing) {
      ref.current.play().catch(() => {
        track.song?.fetchSongUrl()
      })
    } else {
      ref.current.pause()
    }
  }, [playNext, track.playing, track.song, track.song?.url])

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Buttons />
      </div>

      <div className={styles.bottom}>
        {track.song && renderTime(track.currentTime)}
        <ProgressSlider />
        {track.song && renderTime(track.song.dt)}
      </div>

      <audio src={track.song?.url} ref={ref} />
    </div>
  )
})

const renderTime = (timestamp: number) => {
  return <span>{dayjs(timestamp).format('mm:ss')}</span>
}

export default CentralController
