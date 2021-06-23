import { useCallback } from 'react'

import { Renderer } from '@/ipc'
import { usePlayer, OrderEnum } from '@/models'

import { useShufflePlay } from './useShufflePlay'

export function usePlayNext(renderer = Renderer.Main) {
  const { order, playNextSibling, __LYRIC__PROCESS__PlayNextSibling__ } =
    usePlayer()
  const shufflePlay = useShufflePlay(renderer)

  return useCallback(() => {
    switch (order) {
      case OrderEnum.RepeatOne:
      case OrderEnum.Repeat: {
        switch (renderer) {
          case Renderer.Main: {
            playNextSibling()
            break
          }
          case Renderer.Lyric: {
            __LYRIC__PROCESS__PlayNextSibling__()
          }
        }
        break
      }
      case OrderEnum.Shuffle: {
        shufflePlay()
      }
    }
  }, [
    __LYRIC__PROCESS__PlayNextSibling__,
    order,
    playNextSibling,
    renderer,
    shufflePlay,
  ])
}
