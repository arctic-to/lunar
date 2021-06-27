/**
 * Non-idempotent request should not use swr.
 */

import { SnapshotOut, types } from 'mobx-state-tree'
import { useCallback } from 'react'

import { trackNeteaseCloudMusicLikeSong } from '@/data/api'
import { usePlatform } from '@/models'

import { fetcher } from '../fetcher'
import { useLikelist } from '../likelist'

function postLike(id: number, like: boolean) {
  return fetcher<LikeResponseSnapshot>(`/like?id=${id}&like=${like}`)
}

export function useLike(id: number | undefined) {
  const { mutate } = useLikelist()
  const { userId } = usePlatform().netease.profile ?? {}

  const _like = useCallback(
    async (like: boolean) => {
      if (!id) return
      mutate((data) => {
        if (!data) return

        const idSet = new Set(data.ids)
        if (like) {
          idSet.add(id)
          if (userId) {
            trackNeteaseCloudMusicLikeSong({
              songId: id,
              userId,
            })
          }
        } else {
          idSet.delete(id)
        }

        return {
          ...data,
          ids: Array.from(idSet),
        }
      }, false)
      await postLike(id, like)
      mutate()
    },
    [id, mutate, userId],
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
