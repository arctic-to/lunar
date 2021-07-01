import c from 'classnames'
import { ipcRenderer } from 'electron'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'
import { useEffect } from 'react'
import {
  RiRepeat2Line,
  RiShuffleLine,
  RiRepeatOneLine,
  RiPauseFill,
  RiPlayFill,
  RiSkipBackFill,
  RiSkipForwardFill,
} from 'react-icons/ri'

import { GlobalShortcut } from '@/../common'
import { Like } from '@/components'
import { useLike } from '@/data'
import { IconLyric } from '@/icons'
import { OrderEnum, usePlayer } from '@/models'

import styles from './Buttons.module.scss'

export const Buttons: React.VFC = observer(() => {
  const {
    track,
    playPrev,
    playNext,
    order,
    repeat,
    shuffle,
    repeatOne,
    lyric,
  } = usePlayer()
  const [like] = useLike(track.song?.id)
  const { play, pause, turnDownVolume, turnUpVolume, toggle } = track

  const actionMap = useMemo(
    () => ({
      [GlobalShortcut.Like]: like,
      [GlobalShortcut.PlayPrev]: playPrev,
      [GlobalShortcut.PlayNext]: playNext,
      [GlobalShortcut.TurnDownVolume]: turnDownVolume,
      [GlobalShortcut.TurnUpVolume]: turnUpVolume,
      [GlobalShortcut.Toggle]: toggle,
      [GlobalShortcut.ToggleOsdLyric]: lyric.toggle,
      [GlobalShortcut.ToggleOsdLyricTranslation]: lyric.toggleTranslation,
      [GlobalShortcut.ToggleOsdLyricPhonetic]: lyric.togglePhonetic,
    }),
    [
      like,
      lyric.toggle,
      lyric.togglePhonetic,
      lyric.toggleTranslation,
      playNext,
      playPrev,
      toggle,
      turnDownVolume,
      turnUpVolume,
    ],
  )

  useEffect(() => {
    ipcRenderer.on('shortcut:global', (event, shortcut: GlobalShortcut) => {
      actionMap[shortcut]()
    })
    return () => {
      ipcRenderer.removeAllListeners('shortcut:global')
    }
  }, [actionMap])

  return (
    <div className={styles.container}>
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

      <RiSkipBackFill onClick={playPrev} />
      {track.playing ? (
        <RiPauseFill onClick={pause} className={styles.pause} />
      ) : (
        <RiPlayFill onClick={play} className={styles.play} />
      )}
      <RiSkipForwardFill onClick={playNext} />

      <IconLyric
        className={c({ [styles.active]: lyric.show })}
        onClick={lyric.toggle}
      />
      <Like songId={track.song?.id} />
    </div>
  )
})

export default Buttons
