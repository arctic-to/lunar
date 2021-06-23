import { useCallback } from 'react'

import { Renderer } from '@/ipc'
import { usePlayer, queue } from '@/models'

export function useShufflePlay(renderer = Renderer.Main) {
  const { playNth, __LYRIC__PROCESS__PlayNth__ } = usePlayer()

  return useCallback(() => {
    const n = Math.floor(Math.random() * queue.size)
    switch (renderer) {
      case Renderer.Main: {
        playNth(n)
        break
      }
      case Renderer.Lyric: {
        __LYRIC__PROCESS__PlayNth__(n)
      }
    }
  }, [__LYRIC__PROCESS__PlayNth__, playNth, renderer])
}
