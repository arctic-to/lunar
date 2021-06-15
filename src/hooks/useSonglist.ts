import { range } from 'lodash'
import { useState, useCallback } from 'react'

import { PrivilegeSnapshotIn, SongSnapshotIn, usePlayer } from '@/models'

export function useSonglist<T extends SongSnapshotIn>(
  songs: T[],
  privilegeMap: Map<number, PrivilegeSnapshotIn>,
) {
  const player = usePlayer()
  const [activeSongIndexes, setActiveSongIndexes] = useState<number[]>([])

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
      switch (e.code) {
        case 'Enter': {
          const selectedSongs = songs.filter((_, index) =>
            activeSongIndexes.includes(index),
          )
          if (e.ctrlKey) {
            player.insertManyToQueue(selectedSongs)
          } else {
            player.replaceQueue({ songs: selectedSongs })
          }

          player.tryReplaceTrack(
            { song: selectedSongs[0] },
            { privilege: privilegeMap.get(selectedSongs[0].id) },
          )
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
    [activeSongIndexes, player, privilegeMap, songs],
  )

  return {
    activeSongIndexes,
    resetActiveSongIndexes,
    handleKeyDown,
  }
}
