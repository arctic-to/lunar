import { range } from 'lodash'
import { useState, useCallback, useEffect } from 'react'

import { SongSnapshotIn, usePlayer } from '@/models'

export function useSonglist<T extends SongSnapshotIn>(songs?: T[]) {
  const player = usePlayer()
  const [activeSongIndexes, setActiveSongIndexes] = useState<number[]>([])

  useEffect(() => setActiveSongIndexes([]), [songs])

  const resetActiveSongIndexes = useCallback(
    (index: number) => (e: React.MouseEvent) => {
      switch (true) {
        case e.shiftKey: {
          const [lastActiveSongIndex = 0] = activeSongIndexes.slice(-1)
          setActiveSongIndexes([...range(lastActiveSongIndex, index), index])
          break
        }
        case e.ctrlKey: {
          setActiveSongIndexes([...activeSongIndexes, index])
          break
        }
        default: {
          setActiveSongIndexes([index])
        }
      }
    },
    [activeSongIndexes],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!songs) return

      switch (e.code) {
        case 'Enter': {
          const selectedSongs = songs.filter((_, index) =>
            activeSongIndexes.includes(index),
          )
          if (e.ctrlKey) {
            player.insertManyToQueue(selectedSongs)
          } else {
            player.replaceQueue({
              songIds: selectedSongs.map((song) => song.id),
            })
          }

          player.tryReplaceSong(selectedSongs[0])
          break
        }
        case 'KeyA': {
          if (e.ctrlKey) {
            setActiveSongIndexes(
              [...Array(songs.length)].map((_, index) => index),
            )
          }
          break
        }
        case 'Escape': {
          setActiveSongIndexes([])
          break
        }
      }
    },
    [activeSongIndexes, player, songs],
  )

  return {
    activeSongIndexes,
    resetActiveSongIndexes,
    handleKeyDown,
  }
}
