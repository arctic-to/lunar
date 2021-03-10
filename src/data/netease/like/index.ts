/**
 * Non-idempotent request should not use swr.
 */

import { SnapshotOut, types } from 'mobx-state-tree'
import { useCallback } from 'react'

import { fetcher } from '../fetcher'
import { useLikelist } from '../likelist'

function postLike(id: number, like: boolean) {
  return fetcher<LikeResponseSnapshot>(`/like?id=${id}&like=${like}`)
}

export function useLike(id: number | undefined) {
  const { mutate } = useLikelist()
  const _like = useCallback(
    async (like: boolean) => {
      if (!id) return
      mutate((data) => {
        if (!data) return

        const idSet = new Set(data.ids)
        like ? idSet.add(id) : idSet.delete(id)

        return {
          ...data,
          ids: Array.from(idSet),
        }
      }, false)
      await postLike(id, like)
      mutate()
    },
    [id, mutate],
  )

  return [
    /** like */
    useCallback(() => _like(true), [_like]),
    /** unlike */
    useCallback(() => _like(false), [_like]),
  ]
}

type LikeResponseSnapshot = SnapshotOut<typeof LikeResponse>
const LikeResponse = types.model('LikeResponse', {
  songs: types.array(types.number),
  playlistId: types.number,
  code: types.number,
})
