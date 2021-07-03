import { chunk } from 'lodash'
import { SnapshotOut, types } from 'mobx-state-tree'
import { useEffect, useState, useMemo } from 'react'

import { SongSnapshotOut } from '@/models'
import { Privilege, Track } from '@/models/Platform/Netease'
import { getMst, PrivilegeStore, setSongMap } from '@/stores'

import { axios } from '../fetcher'

const CHUNK_SIZE = 500
const privilegeStore = getMst(PrivilegeStore)

export function useSongDetail(songIds: number[] | undefined) {
  const idStr = songIds?.join()
  const [error, setError] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const [songChunks, setSongChunks] = useState<SongSnapshotOut[][]>([])
  const data = useMemo(() => songChunks.flat(), [songChunks])

  useEffect(() => {
    if (!idStr) return
    const ids = idStr.split(',')
    const idChunks = chunk(ids, CHUNK_SIZE)

    const promises = idChunks.map((idChunk, index) => {
      return axios
        .post<SongDetailResponseSnapshot>(
          `/song/detail?timestamp=${Date.now()}`,
          { ids: idChunk.join() },
          { withCredentials: true },
        )
        .then(({ data }) => {
          setSongChunks((prevSongChunks) => {
            const _prevSongChunks = [...prevSongChunks]
            _prevSongChunks[index] = data.songs
            return _prevSongChunks
          })
          setSongMap(data.songs)
          privilegeStore.setSongPrivilegeMap(data.songs, data.privileges)
        })
        .catch((err) => setError(err))
    })

    Promise.all(promises).then(() => {
      setIsLoaded(true)
    })
  }, [idStr])

  return {
    isLoaded,
    data,
    error,
  }
}

type SongDetailResponseSnapshot = SnapshotOut<typeof SongDetailResponse>
const SongDetailResponse = types.model('SongDetailResponse', {
  code: types.number,
  songs: types.array(Track),
  privileges: types.array(Privilege),
})
